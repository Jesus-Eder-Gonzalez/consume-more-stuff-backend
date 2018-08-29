const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const saltRounds = 12;
const User = require('../../db/models/User');

router.put('/', (req, res) => {
  let username = req.user.username;
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) { return res.status(500); }
    bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
      if (err) { return res.status(500); }
      return User
        .where({ username })
        .save({ password: hashedPassword }, { patch: true })
        .then(user => {
          console.log('username', username)
          return res.json(user.attributes)
        })
        .catch(err => {
          console.log('err: ', err);
          return res.send('Unable to change password. Please try again later.')
        })
    })
  })
})

module.exports = router;