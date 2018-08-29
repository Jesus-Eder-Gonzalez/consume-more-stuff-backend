const express = require('express')
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const router = express.Router();

const User = require('../../db/models/User');
const saltRounds = 12;


// ===== PASSPORT METHODS ===== //
passport.serializeUser((user, done) => {
  return done(null, {
    id: user.id,
    username: user.username.toLowerCase()
  });
});

passport.deserializeUser((user, done) => {
  new User({ id: user.id })
    .fetch()
    .then(user => {
      user = user.toJSON();
      return done(null, {
        id: user.id,
        username: user.username.toLowerCase()
      });
    })
    .catch(err => {
      console.log('error: ', err);
      return done(err);
    });
});

passport.use(new LocalStrategy((username, password, done) => {
  return new User({ username: username })
    .fetch()
    .then(user => {
      user = user.toJSON();
      if (user === null) {
        return done(null, false, { message: 'Invalid Username and/or Password' });
      } else {
        bcrypt.compare(password, user.password)
          .then(samePassword => {
            if (samePassword) {
              return done(null, user);
            } else {
              return done(null, false, { message: 'Invalid Username and/or Password' });
            };
          });
      };
    })
    .catch(err => {
      console.log('error: ', err);
      return done(err);
    });
}));

// ===== REGISTRATION ===== //
router.post('/register', (req, res) => {
  console.log('req.body', req.body)
  let {
    username,
    email
  } = req.body;
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) { return res.status(500); }
    bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
      if (err) { return res.status(500); }
      return new User({
        username: username.toLowerCase(),
        password: hashedPassword,
        email: email,
        status_id: 2
      })
        .save()
        .then(result => {
          res.redirect('/');
        })
        .catch(err => {
          console.log('err: ', err);
          return res.send('Unable to register with that username');
        });
    });
  });
});

// ===== LOG IN / LOG OUT ===== //

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.login(user, err => {
      if (err) { return next(err); }
      return res.json({ success: true })
    })
  })(req, res, next)
});

router.get('/logout', (req, res) => {
  req.logout();
  res.json({ success: true})
});

module.exports = router;