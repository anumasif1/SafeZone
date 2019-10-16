var bCrypt = require('bcrypt-nodejs');
var color = require("colors");

module.exports = function (passport, user) {
    var User = user;
    var LocalStrategy = require('passport-local').Strategy;

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        User.findOne({_id: id}).then(function (user) {
            if (user) {
                done(null, user);
            }
            else {
                done(user.errors, null);
            }
        }); 

    });
    passport.use('local-signup', new LocalStrategy(
        
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, name, password, done) {
            console.log(color.green("$$$$$$$$$$$$$$$$$$$$$"));
            var generateHash = function (password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };

            User.findOne({username: name}).then(function (user) {

                if (user) {
                    console.log(color.red('User name has been taken! Please try a different one!'))
                    return done(null, false, req.flash('error','Email has been taken! Please try a different one!'));
                }
                else {
                    var userPassword = generateHash(password);
                    var data =
                    {
                        username: name,
                        password: userPassword,
                        email: req.body.email,
                        address: req.body.address
                    };
                    User.create(data).then(function (newUser, created) {
                        if (!newUser) {
                            return done(null, false);
                        }
                        if (newUser) {
                            return done(null, newUser);
                        }
                    }).catch((err) => {
                        console.log(err);
                    });
                }
            });
        }
    ));
    passport.use('local-login', new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true 
        },
        function (req, name, password, done) {
            var User = user;
            var isValidPassword = function (userpass, password) {
                return bCrypt.compareSync(password, userpass);
            }
            User.findOne({username: name}).then(function (user) {
                if (!user) {
                    return done(null, false, req.flash('error','Email does not exist! Please try again!'));
                }
                if (!isValidPassword(user.password, password)) {
                    return done(null, false, req.flash('error','Wrong password! Please try again!'));
                }
                var userInfo = user;
                return done(null, userInfo);
            }).catch(function (err) {
                console.log("Error:", err);
                return done(null, false, req.flash('error','Something went wrong with your Signin' )); 
            });
        }
    ));

}