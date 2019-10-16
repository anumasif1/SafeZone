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


}




// router
//     .route("/api/signup/")
//     .post(controller.addUser);

// module.exports = router;