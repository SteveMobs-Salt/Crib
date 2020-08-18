const express = require("express");
const router = express.Router();
const passport = require("passport");
const Household = require('../models/Household')

router.post("/register_login", (req, res, next) => {
    passport.authenticate("local", function (err, user, info) {
        if (err) {
            return res.status(400).json({ errors: err });
        }
        if (!user) {
            return res.status(400).json({ errors: "No user found" });
        }
        req.logIn(user, async function (err) {
            if (err) {
                return res.status(400).json({ errors: err });
            }
            const household = await Household.findOne({owner: user.id}).exec()
            return res.status(200).json({ 
                success: `logged in as ${user.id}`,
                user: user.id,
                household: household.id,
            });
        });
    })(req, res, next);
});

router.get("/register_logout", (req, res, next) => {
    console.log(req.session);
    req.session.destroy(function (err) {
        res.redirect('/');
    })
    console.log(req.session);
});

module.exports = router;