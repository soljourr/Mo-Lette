//package we need
const express  = require('express');
const app      = express();
const port     = process.env.PORT || 5000;
const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose');
const passport = require('passport');
//allows ensuring that the message is available to the next page that is to be rendered
const flash    = require('connect-flash');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const session      = require('express-session');
const configDB = require('./config/database.js');

var db


// connect to our database
mongoose.connect(configDB.url, (err, database) => {
  if (err) return console.log(err)
  db = database
  require('./app/routes.js')(app, passport, db);
});

require('./config/passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());

// required for passport
app.use(session({
    secret: 'rcbootcamp2019a', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.listen(port);
console.log(`I'm on 5k`)
