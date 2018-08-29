const express = require('express');
const router = express.Router();

const User = require('../../db/models/User');

router.put('/', (req, res) => {
  console.log(req.user)
  let username = req.user.username;
  let { password } = req.body;
  return User
    .where({ username })
    .save({ password }, {patch: true})
    .then(user => {
      console.log('username', username)
      return res.json(user.attributes)
    })
    .catch(err => {
      console.log('err: ', err);
      return res.send('Unable to change password. Please try again later.')
    })
})

module.exports = router;