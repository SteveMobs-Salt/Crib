const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const auth = require('./routes/auth');
require('dotenv').config();

const app = express();
const PORT = 3001;
const Household = require('./models/Household');
const passport = require('./passport/setup');

const MONGO_URI = `mongodb+srv://test-admin:${process.env.DB_PASSWORD}@pad.gb15x.azure.mongodb.net/database?retryWrites=true&w=majority`;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log(`MongoDB connected ${MONGO_URI}`))
  .catch(err => console.log(err));

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
app.get('/', (req, res) => res.send('Good morning sunshine!'));

app.post('/expenses', async (req, res) => {
  // const owner = req.session.passport.user;
  const {
    amount,
    debtors,
    name,
    category,
  } = req.body;
  const householdId = req.session.household;
  const household = await Household.findById(householdId);
  const uuid = uuidv4();
  household.expenses
    .push({
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
    household.shoppingList.push({ _id: uuid, name, bought: false });
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
app.get('/household', async (req, res) => {
  const householdId = req.session.household;
  const household = await Household.findById(householdId);
  res.json(household);
});

app.listen(PORT, () => console.log(`Backend listening on port ${PORT}!`));
