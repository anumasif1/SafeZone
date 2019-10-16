const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3001;
const logger = require("morgan");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");
const db = require("./models");
// const routes = require('./routes/routes')(app, passport);

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(flash());

app.use(session({ secret: "mac master", cookie: { maxAge: 30 * 60 * 1000 }, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport/passport")(passport, db.User);

require("./routes/routes")(app, passport);

// app.use(routes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.use(function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

require('./routes/routes')(app, passport)

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('sendmsg', function (data) {
        console.log('server receive :', data);
        io.emit('recvmsg', data)
    })
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/safezone3",
    { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true });


http.listen(PORT, () => {
    console.log(`😎` + ` ` + ` => App is listening on: ${PORT}`);
})





