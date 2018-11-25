const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const expressValidator = require('express-validator');
const MySQLStore = require('express-mysql-session')(session);
const helmet = require('helmet');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mysql = require('mysql');

const routes = require('./routes/routes');

const user = require('./mysql/user');
const book = require('./mysql/book');
const category = require('./mysql/category');

const app = express();

dotenv.config();

app.use(cors());
app.use(cookieParser());
app.use('/public', express.static(process.cwd() + '/public'));

const options = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
};

const connection = mysql.createConnection(options);
const sessionStore = new MySQLStore(connection);

connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  } else {
    console.log('connected as id ' + connection.threadId);

    db.query(user, (err, results, fields) => {
      if (err) throw err;
      else {
        console.log("Table user created successfully...");
      }
    });

    db.query(book, (err, results, fields) => {
      if (err) throw err;
      else {
        console.log("Table book created successfully...");
      }
    });

    db.query(category, (err, results, fields) => {
      if (err) throw err;
      else {
        console.log("Table category created successfully...");
      }
    });

    app.use(flash());

    app.use((req, res, next) => {
      res.locals.success_messages = req.flash('success_messages');
      res.locals.error_messages = req.flash('error_messages');
      next();
    });

    app.use('/', routes);

    app.listen(process.env.PORT, () => {
      console.log("Listening on port 3000");
    });
  }
});

global.db = connection;

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(expressValidator());

app.set('views', process.cwd() + '/views/pug');
app.set('view engine', 'pug');

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy((username, password, done) => {
  console.log(username);
  console.log(password);
  db.query(`select id, password from User where Username = ?`, [username], (err, results, fields) => {
    if (err) done(err);
    if (results.length === 0) {
      done(null, false, {
        message: 'Invalid username'
      });
    } else {
      const hash = results[0].password.toString();
      bcrypt.compare(password, hash, (err, response) => {
        if (err) throw err;
        if (response) {
          return done(null, {
            user_id: results[0].id
          });
        } else {
          return done(null, false, {
            message: 'Invalid password'
          });
        }
      });
    }
  });
}));