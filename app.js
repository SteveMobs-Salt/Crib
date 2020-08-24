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

app.post('/expenses', async (req, res) => {
  // const owner = req.session.passport.user;
  const { amount, debtors, name, category } = req.body;
  const householdId = req.session.household;
  const household = await Household.findById(householdId);
  const uuid = uuidv4();
  household.expenses.push({
    _id: uuid,
    name,
    amount,
    debtors,
    category,
    date: Date.now(),
  });
  household.save();
  res.json({
    data: household,
  });
});

app.delete('/expenses', async (req, res) => {
  const { id } = req.query;
  const householdId = req.session.household;
  const household = await Household.findById(householdId);
  const index = household.expenses.map(a => a._id).indexOf(id);
  if (index === -1) {
    return res.status(404).end();
  }
  household.expenses.splice(index, 1);
  household.save();
  console.log(id);
  return res.json(household);
});

app.put('/expenses', async (req, res) => {
  const { name, id, amount, debtors, category } = req.body;
  const householdId = req.session.household;
  const household = await Household.findById(householdId);
  const index = household.expenses.map(a => a._id).indexOf(id);
  if (index === -1) {
    return res.status(404).end();
  }
  if (name) household.expenses[index].name = name;
  if (category) household.expenses[index].category = category;
  if (debtors) household.expenses[index].debtors = debtors;
  if (amount) household.expenses[index].amount = amount;
  household.save();
  return res.json(household);
});

// TODO have session; expense body posted to household id
app.post('/shopping_list', async (req, res) => {
  const owner = req.session.passport.user;
  const { name } = req.body;
  const householdId = req.session.household;
  const household = await Household.findById(householdId);
  // for a group : if(household.owner === owner | household.owner.includes(id)
  // OR pass along groupId )
  if (household.owner === owner) {
    const uuid = uuidv4();
    household.shoppingList.push({
      _id: uuid,
      name,
      bought: false,
      date: Date.now(),
    });
    household.save();
    res.json(household);
  }
});

app.delete('/shopping_list', async (req, res) => {
  const { id } = req.query;
  const householdId = req.session.household;
  const household = await Household.findById(householdId);
  /* eslint no-underscore-dangle: 0 */
  const index = household.shoppingList.map(a => a._id).indexOf(id);
  if (index === -1) {
    return res.status(404).end();
  }
  household.shoppingList.splice(index, 1);
  household.save();
  return res.json(household);
});

// Fetch household data
app.get('/api/household', async (req, res) => {
  const householdId = req.session.household;
  const owner = req.session.passport.user;
  const household = await Household.aggregate([{ $match: { owners: { $in: [owner] } } }]).exec();
  // const household = await Household.findById(householdId);
  res.json(household);
});

app.post('/budget', async (req, res) => {
  const { category, amount } = req.body;
  const householdId = req.session.household;
  const household = await Household.findById(householdId);
  household.budgets.push({ category, amount });
  household.categories.push(category);
  household.save();
  res.json(household);
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

app.post('/api/groups/create', async (req, res) => {
  const newHousehold = new Household({ owners: [req.session.passport.user] });
  newHousehold.name = req.body.name;
  newHousehold.type = "Group";
  newHousehold.save();
  res.json(newHousehold.referral_code);
})


app.listen(PORT, () => console.log(`Backend listening on port ${PORT}!`));
