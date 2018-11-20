const router = require('express').Router();
const expressValidator = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const passport = require('passport');

const authCheck = (req, res, next) => {
  console.log(req.user);
  console.log(req.isAuthenticated());
  if(req.isAuthenticated()) {
    res.render('profile', {user: req.user.user_id});
  }
  return next();
};

router.get('/', authCheck, (req, res) => {
  res.render('index');
});

router.get('/profile', authCheck, (req, res) => {
  res.redirect('/');
});

router.get('/login', authCheck, (req, res) => {
  res.render('login', {error: false});
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/login'
}));

router.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
})

router.get('/signup', authCheck, (req, res) => {
  res.render('signup', {error: false, taken: false});
});

router.post('/signup', (req, res) => {
  req.checkBody('username', 'Username cannot be empty').notEmpty();
  req.checkBody('username', 'Username must be between 4-15 characters long.').len(4, 15); 
  req.checkBody('username', 'Username can only contain letters, numbers, or underscores.').matches(/^[A-Za-z0-9_]+$/, 'i');
  req.checkBody('email', 'Invalid email.').isEmail(); 
  req.checkBody('email', 'Email address must be between 4-100 characters long.').len(4, 100); 
  req.checkBody('password', 'Password must be between 8-100 characters long.').len(8, 100); 
  req.checkBody("password", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i"); 
  req.checkBody('passwordMatch', 'Password must be between 8-100 characters long.').len(8, 100); 
  req.checkBody('passwordMatch', 'Passwords do not match, please try again.').equals(req.body.password); 

  const errors = req.validationErrors();

  if(errors) {
    console.log(`errors: ${JSON.stringify(errors)}`);
    res.render('signup', {error: true, taken: false});
  } else {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    db.query(`select * from wadu where username = ?`, [username], (err, result) => {
      if(err) {
        throw err;
      } else if(result[0]) {
        res.render('signup', {error: false, taken: true});
      } else {
        bcrypt.hash(password, saltRounds, (err, hash) => {
          if(err) {
            throw err;
          }
          db.query(`insert into wadu(username, email, password) values(?, ?, ?)`, [username, email, hash], (err, results) => {
            if(err) {
              throw err;
            }
            db.query(`select last_insert_id() as user_id`, (err, result, fields) => {
              if(err) throw err;
              const user_id = result[0];
              req.login(user_id, (err) => {
                if(err) throw err;
                res.redirect('/profile');
              });
            });
          });
        });
      }
    });
  }
});

passport.serializeUser((user_id, done) => {
  done(null, user_id);
});

passport.deserializeUser((user_id, done) => {
  done(null, user_id);
});

module.exports = router;