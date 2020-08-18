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
app.get('/', (req, res) => res.send('Good monring sunshine!'));

// obsolete
// app.get("/createHousehold", (req, res) => {
//     const owner = req.session.passport.user;
//     const newHousehold = new Household({ owner });
//     newHousehold.save();
//     res.json({
//         message: "Succesfully created household.",
//         data: newHousehold
//     });
// })

app.post('/expenses', async (req, res) => {
  const owner = req.session.passport.user;
  const { id } = req.body;
  const household = await Household.findById(id);
  const uuid = uuidv4();
  household.expenses.push({ _id: uuid, name: 'groceries', amount: 5.99 });
  household.save();
  res.json({
    data: household,
  });
});

app.listen(PORT, () => console.log(`Backend listening on port ${PORT}!`));
