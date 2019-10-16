const db = require('../models/');
const _ = require('lodash');
const bCrypt = require('bcrypt-nodejs');
const express = require('express');
const app = express();

const generateHash = function (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
};

module.exports.homePage = (req, res) => {
    console.log(req.user);
}

// module.exports.addUser = (req, res) => {
//     console.log(req.body);
//     passport.authentication('local-signup', {
//         successRedirect: '/',
//         failureRedirect: '/signup/'
//     })
// }

// module.exports.postUser = (req, res) => {
//     let dataPick = _.pick(req.body, ["username", "email", "password", "address"]);
//     let data = {
//         username: dataPick.username,
//         email: dataPick.email,
//         password: generateHash(dataPick.password),
//         address: dataPick.address
//     };
//     db.User.create(data)
//         .then((dbUser) => {
//             console.log("This is postUser controller", dbUser);
//             res.json(dbUser);
//         })
//         .catch(err => {
//             console.log(err);
//         });
// }