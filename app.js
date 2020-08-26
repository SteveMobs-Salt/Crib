const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const auth = require('./routes/auth');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;
const Household = require('./models/Household');
const passport = require('./passport/setup');

const MONGO_URI = `mongodb+srv://test-admin:${process.env.DB_PASSWORD}@pad.gb15x.azure.mongodb.net/database?retryWrites=true&w=majority`;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log(`MongoDB connected ${MONGO_URI}`))
  .catch(err => console.log(err));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('./client/build'));
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
1;

// Bodyparser middleware, extended false does not allow nested payloads
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Express Session
app.use(
  session({
    secret: 'very secret this is',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  }),
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', auth);

// FIXED
app.post('/expenses', async (req, res) => {
  // const owner = req.session.passport.user;
  const { amount, debtors, name, category, id } = req.body;
  // const householdId = req.session.household;
  const household = await Household.findById(id);
  const uuid = uuidv4();
  household.expenses.push({
    _id: uuid,
    name,
    amount,
    debtors,
    creditor: req.session.passport.user,
    category,
    date: Date.now(),
  });
  household.markModified('expenses');
  household.save();
  res.redirect('/api/household');
});

// FIXED
app.delete('/expenses', async (req, res) => {
  const { id, expenseId } = req.query;
  // const householdId = req.session.household;
  const household = await Household.findById(id);
  const index = household.expenses.map(a => a._id).indexOf(expenseId);
  if (index === -1) {
    return res.status(404).end();
  }
  household.expenses.splice(index, 1);
  household.markModified('expenses');
  household.save();
  return res.status(202).end();
});
// FIXED
app.put('/expenses', async (req, res) => {
  const { name, expenseId, amount, debtors, category, id } = req.body;
  const household = await Household.findById(id);
  const index = household.expenses.map(a => a._id).indexOf(expenseId);
  if (index === -1) {
    return res.status(404).end();
  }
  if (name) household.expenses[index].name = name;
  if (category) household.expenses[index].category = category;
  if (debtors) household.expenses[index].debtors = debtors;
  if (amount) household.expenses[index].amount = amount;
  household.markModified('expenses');
  household.save();
  return res.redirect('/api/household');
});

//FIXED
app.post('/shopping_list', async (req, res) => {
  // const owner = req.session.passport.user;
  const { name, id } = req.body;
  const household = await Household.findById(id);
  const uuid = uuidv4();
  household.shoppingList.push({
    _id: uuid,
    name,
    bought: false,
    date: Date.now(),
  });
  household.markModified('shoppingList');
  household.save();
  res.redirect('/api/household');
  1;
});

// FIXED
app.delete('/shopping_list', async (req, res) => {
  const { taskId, id } = req.query;
  // const householdId = req.session.household;
  const household = await Household.findById(id);
  /* eslint no-underscore-dangle: 0 */
  const index = household.shoppingList.map(a => a._id).indexOf(taskId);
  if (index === -1) {
    return res.status(404).end();
  }
  household.shoppingList.splice(index, 1);
  household.markModified('shoppingList');
  household.save();
  return res.status(202).end();
});

// Fetch household data
app.all('/api/household', async (req, res) => {
  const userId = req.session.passport.user;
  const household = await Household.aggregate([
    {
      $match: {
        owners: {
          $all: [
            {
              $elemMatch: { userId },
            },
          ],
        },
      },
    },
  ]).exec();
  res.json(household);
});

// FIXED
app.post('/budget', async (req, res) => {
  const { category, amount, id } = req.body;
  const household = await Household.findById(id);
  household.budgets.push({ category, amount });
  household.categories.push(category);
  household.markModified('budgets');
  household.markModified('categories');
  household.save();
  res.redirect('/api/household');
});

app.put('/budget', async (req, res) => {
  const { category, amount, id, previousCategory } = req.query;
  const household = await Household.findById(id);
  const index = household.budgets
    .map(b => b.category)
    .indexOf(previousCategory);
  if (index === -1) {
    return res.status(404).end();
  }
  if (amount) {
    household.budgets[index].amount = Number(amount);
  }
  if (category) {
    household.budgets[index].category = category;
    household.categories[index] = category;
    household.expenses = household.expenses.map(a => {
      if (a.category === previousCategory) {
        return { ...a, category };
      }
      return a;
    });
  }
  household.markModified('expenses');
  household.markModified('categories');
  household.markModified('budgets');
  household.save();
  return res.redirect('/api/household');
});

app.delete('/budget', async (req, res) => {
  const { category, id } = req.query;
  const household = await Household.findById(id);
  const budgetIndex = household.budgets.map(b => b.category).indexOf(category);
  const catIndex = household.categories.indexOf(category);
  household.budgets.splice(budgetIndex, 1);
  household.categories.splice(catIndex, 1);
  household.expenses = household.expenses.map(a => {
    if (a.category === category) {
      return { ...a, category: 'Other' };
    }
    return a;
  });
  household.markModified('budgets');
  household.markModified('categories');
  household.markModified('expenses');
  household.save();
  return res.redirect('/api/household');
});

app.post('/api/groups/join', async (req, res) => {
  const { referral_code } = req.body;
  const household = await Household.findOne({ referral_code: referral_code });
  //TODO fix if statement (array of objects now instead of strings)
  const ownersArray = household.owners.map(a => a.userId);
  if (ownersArray.includes(req.session.passport.user)) {
    return res.redirect('/api/household');
  }
  household.owners.push({
    userId: req.session.passport.user,
    name: req.session.name,
  });
  household.markModified('owners');
  household.save();
  return res.redirect('/api/household');
});

// add name for group owner/creator
app.post('/api/groups/create', async (req, res) => {
  const newHousehold = new Household({
    owners: [{ userId: req.session.passport.user, name: req.session.name }],
    name: req.body.name
  });
  // newHousehold.name = req.body.name;
  newHousehold.type = 'Group';
  await newHousehold.save();
  res.json(newHousehold.referral_code);
});

app.delete('/api/groups/leave', async (req, res) => {
  const { id, userId } = req.query;
  const household = await Household.findById(id);
  const index = household.owners.map(a => a.userId).indexOf(userId);
  if (index === -1) {
    return res.status(404).end();
  }
  household.owners.splice(index, 1);
  household.markModified('owners');
  household.save();
  return res.redirect('/api/household');
})

app.listen(PORT, () => console.log(`Backend listening on port ${PORT}!`));
