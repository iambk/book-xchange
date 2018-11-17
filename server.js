const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const helmet = require('helmet');
const pug = require('pug');
const passport = require('passport');
const session = require('express-session');
const mysql = require('mysql');

const app = express();

dotenv.config();

app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

connection.query('SELECT * from food;', function (error, results, fields) {
  if (error) throw error;
  console.log(results);
});

app.route('/').get((req, res) => {
  res.render(process.cwd() + '/views/pug/index.pug');
})

app.listen(process.env.PORT, () => {
  console.log("Listening on port 3000");
});

connection.end();