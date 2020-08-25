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

//TODO NEED TO ADD DEBTORS - NEARLY FIXED
app.put('/expenses', async (req, res) => {
  const { name, expenseId, amount, debtors, category, id } = req.body;
  // const householdId = req.session.household;
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
  return res.status(200).end();
});

// TODO have session; expense body posted to household id
//FIXED
app.post('/shopping_list', async (req, res) => {
  const owner = req.session.passport.user;
  const { name, id } = req.body;
  // const householdId = req.session.household;
  const household = await Household.findById(id);
  // for a group : if(household.owner === owner | household.owner.includes(id)
  // OR pass along groupId )
  if (household.owners.includes(owner)) {
    const uuid = uuidv4();
    household.shoppingList.push({
      _id: uuid,
      name,
      bought: false,
      date: Date.now(),
    });
    household.markModified('shoppingList')
    household.save();
    res.redirect('/api/household')
  }
});

// FIXED
app.delete('/shopping_list', async (req, res) => {
  const { taskId, id } = req.query;
  console.log('made it to the endpoint', taskId, id)
  // const householdId = req.session.household;
  const household = await Household.findById(id);
  console.log(household)
  /* eslint no-underscore-dangle: 0 */
  const index = household.shoppingList.map(a => a._id).indexOf(taskId);
  console.log(index)
  if (index === -1) {
    return res.status(404).end();
  }
  household.shoppingList.splice(index, 1);
  household.markModified('shoppingList');
  household.save();
  return res.status(202).end();
});

// Fetch household data
app.get('/api/household', async (req, res) => {
  const householdId = req.session.household;
  const owner = req.session.passport.user;
  const household = await Household.aggregate([{ $match: { owners: { $in: [owner] } } }]).exec();
  // const household = await Household.findById(householdId);
  res.json(household);
});

// FIXED
app.post('/budget', async (req, res) => {
  console.log(req.body)
  const { category, amount, id } = req.body;
  // const householdId = req.session.household;
  const household = await Household.findById(id);
  household.budgets.push({ category, amount });
  household.categories.push(category);
  household.markModified('budgets');
  household.markModified('categories');
  household.save();
  res.redirect('/api/household');
});

app.put('/budget', async (req, res) => {
  const { category, amount } = req.body;
  const householdId = req.session.household;
  const household = await Household.findById(householdId);
  const index = household.budgets.map(b => b.category).indexOf(category);
  if (index === -1) {
    return res.status(404).end();
  }
  household.budgets[index].amount = amount;
  household.save();
  return res.json(household);
});

app.delete('/budget', async (req, res) => {
  const { category } = req.body;
  const householdId = req.session.household;
  const household = await Household.findById(householdId);
  const defaultCat = [
    'Groceries',
    'Housing',
    'Utilities',
    'Transportation',
    'Insurance',
    'Loan Repayments',
  ];
  if (defaultCat.includes(category)) {
    return res.status(403).end();
  }
  const budgetIndex = household.budgets.map(b => b.category).indexOf(category);
  const catIndex = household.categories.indexOf(category);
  household.budgets.splice(budgetIndex, 1);
  household.categories.splice(catIndex, 1);
  household.save();
  return res.json(household);
});

app.post('/api/groups/join', async (req, res) => {
  const { referral_code } = req.body;
  const household = await Household.findOne({ referral_code: referral_code });
  console.log(household);
  console.log(referral_code);
  household.owners.push(req.session.passport.user);
  household.markModified('owners');
  household.save();
  res.status(202).end();
})

app.post('/api/groups/create', async (req, res) => {
  const newHousehold = new Household({ owners: [req.session.passport.user] });
  newHousehold.name = req.body.name;
  newHousehold.type = "Group";
  await newHousehold.save();
  res.json(newHousehold.referral_code);
})



app.listen(PORT, () => console.log(`Backend listening on port ${PORT}!`));
