const express = require('express');

const router = express.Router();
const passport = require('passport');
const Household = require('../models/Household');

router.post('/register_login', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      return res.status(400).json({ errors: err });
    }
    if (!user) {
      return res.status(400).json({ errors: 'No user found' });
    }
    req.logIn(user, async function (err) {
      if (err) {
        return res.status(400).json({ errors: err });
      }
      const household = await Household.aggregate([{ $match : { owners: {$in : [user.id]} }}]).exec();
      // console.log(household)
      req.session.household = household.id;
      return res.status(200).json({
        success: `logged in as ${user.id}`,
        user: user.id,
        household: household.id,
      });
    });
  })(req, res, next);
});

router.get('/logout', (req, res, next) => {
  req.session.destroy(err => {
    if (err) res.send(err);
    res.redirect('/');
  });
});

module.exports = router;
