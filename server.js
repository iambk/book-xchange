const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const express = require('express');
const session = require('express-session');
const expressValidator = require('express-validator');
const MySQLStore = require('express-mysql-session')(session);
const helmet = require('helmet');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mysql = require('mysql');
const routes = require('./routes/routes');

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

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  } else {
    console.log('connected as id ' + connection.threadId);
    
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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

app.set('views', process.cwd() + '/views/pug');
app.set('view engine', 'pug');

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy((username, password, done) => {
  console.log(username);
  console.log(password);
  db.query(`select id, password from wadu where username = ?`, [username], (err, results, fields) => {
    if(err) done(err);
    if(results.length === 0) {
      done(null, false);
    } else {
      const hash = results[0].password.toString();
      bcrypt.compare(password, hash, (err, response) => {
        if(response) {
          return done(null, {user_id: results[0].id});
        } else {
          return done(null, false);
        }
      });
    }
  });
}));