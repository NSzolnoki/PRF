const express = require('express');
const cors = require('cors');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const session = require("express-session");
const MongoStore = require('connect-mongo');

const app = express();

const port = process.env.PORT || 3000;
const dbUrl = 'mongodb+srv://nszolnoki:cIKIBZAM6EDiNqGa@cluster0.fiqx3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(dbUrl);

mongoose.connection.on('connected', () => {
    console.log('db csatlakoztatva');
})

mongoose.connection.on('error', (err) => {
    console.log('Hiba történt', err);
})

require('./example.model');
require('./user.model');
require('./item.model');
require('./order.model');

const userModel = mongoose.model('user');

app.use(cookieParser());
app.enable('trust proxy'); // add this line
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  proxy: true, // add this line
  cookie: {
    secure: false,
    maxAge: 3600000,
    store: MongoStore.create({
        mongoUrl: dbUrl,
        autoRemove: 'interval',
        autoRemoveInterval: 10,
        collectionName: 'open_sessions'
    })
  }
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({}));

const whitelist = ['https://prf-react.herokuapp.com', 'http://localhost:4200', 'http://prf-react.herokuapp.com'];

app.use((req, res, next) =>{
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS'){
        res.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Allow-Max-Age', '3600');
    }
    next();
})


var corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin', 
    'Origin', 'Accept']
  };

app.use(cors(corsOptions));




app.use(passport.initialize());

app.use(passport.session());

passport.use('local', new localStrategy(function (username, password, done) {
    userModel.findOne({ username: username }, function (err, user) {
        if (err) return done('Hiba lekeres soran', null);
        if (!user) return done('Nincs ilyen felhasználónév', null);
        user.comparePasswords(password, function (error, isMatch) {
            if (error) return done(error, false);
            if (!isMatch) return done('Hibas jelszo', false);
            return done(null, user);
        })
    })
}));


passport.serializeUser(function (user, done) {
    if (!user) return done('nincs megadva beléptethető felhasználó', null);
    return done(null, user);
});

passport.deserializeUser(function (user, done) {
    if (!user) return done("nincs user akit kiléptethetnénk", null);
    return done(null, user);
});

app.get('/', (req, res, next) => {
    res.send({ message: 'Hello world!' });
});

app.use('/', require('./routes'));

app.use((req, res, next) => {
    console.log('Ez a hibakezelő');
    res.status(404).send('A kért erőforrás nem található!');
});



app.listen(port, () => {
    console.log('The server is running!')
});