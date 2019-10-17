// const router = require('express').Router();
const controller = require('../controllers/controller');
// const express = require('express');
// const app = express();
// const passport = require('passport');
const color = require('colors');

module.exports = (app, passport) => {

    // app.post("/api/signup/", (req, res) => {
    //     console.log(req.body);
    // })

    app.post('/api/signup/', passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/signup/'
    }
    ));

    app.post('/api/login/', passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/login/'
    }));

    app.get("/api/isloggedin/", isLoggedIn);

    app.get("/api/logout/", logout);

    //check if user logged in
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            res.json({message: "y", user: req.user.username})
            // return next();

        } else {
            // res.redirect('/');
            res.json({ message: "n" })
        }
    }

    function logout(req, res) {
        req.session.destroy(function (err) {
            res.redirect('/');
        });
    }

}




// router
//     .route("/api/signup/")
//     .post(controller.addUser);

// module.exports = router;