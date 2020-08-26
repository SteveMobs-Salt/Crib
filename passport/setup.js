const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Household = require('../models/Household');
const User = require('../models/Users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Local Strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    (req, email, password, done) => {
      // Match User
      User.findOne({ email: email })
        .then(user => {
          // Create new User
          if (!user) {
            const newUser = new User({ email, password, name: req.body.name });
            const newHousehold = new Household({
              owners: [{ name: newUser.name, userId: newUser.id }],
            });
            if (req.body.referral) {
              const household = Household.findOne({
                referral_code: req.body.referral,
              });
              household.owners.push({
                userId: newUser.id,
                name: newUser.name,
              });
              household.markModified('owners');
              household.save();
            }
            newHousehold.save();
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;

                newUser.password = hash;
                newUser
                  .save()
                  .then(user => {
                    return done(null, user);
                  })
                  .catch(err => {
                    return done(null, false, { message: err });
                  });
              });
            });
            // Return other user
          } else {
            // Match password
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) throw err;

              if (isMatch) {
                return done(null, user);
              } else {
                return done(null, false, { message: 'Wrong password' });
              }
            });
          }
        })
        .catch(err => {
          return done(null, false, { message: err });
        });
    },
  ),
);

module.exports = passport;
