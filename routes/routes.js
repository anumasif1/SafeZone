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

    app.get('/api/getuser/', controller.getUser);
    app.get('/api/getchat/', controller.getChat);
    app.get('/api/getnews', controller.getNews);

    app.post('/api/savechat', controller.saveChat);

    app.get("/api/isloggedin/", isLoggedIn);

    app.get("/api/logout/", logout);

    //check if user logged in for API routes
    function isLoggedInAPI(req, res, next) {
        if (req.isAuthenticated()) {
            return next();

        } else {
            res.redirect('/');
            // res.json({ message: "n" })
        }
    }
    //check if user logged in for Navbar status
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            res.json({ message: "y", user: req.user.username, id: req.user._id })
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