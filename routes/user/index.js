const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const saltRounds = 12;
const User = require('../../db/models/User');
const Item = require('../../db/models/Item');
const Message = require('../../db/models/Message');


// ===== GET ALL OF USER'S ITEMS ===== //
router.get('/items', (req, res) => {
  let id = req.user.id;
  return Item
    .where({ created_by: id })
    .fetchAll({ withRelated: ['itemStatus']})
    .then(userItems => {
      res.json(userItems);
    })
    .catch(err => {
      console.log('error : ', err)
    });
});

// ===== MESSAGES ===== //
router.get('/messages/:itemId', (req, res) => {
  console.log(req.params)
  console.log(req.user)
  let itemId = req.params.itemId;
  let userId = req.user.id;
  return Message
    .where({
      seller_id: userId,
      item_id: itemId
    })
    .fetchAll()
    .then(itemMessages => {
      if (itemMessages.length < 1) {
        res.json({ message: 'You do not have permission to view this message.' })
      }
      else { res.json(itemMessages) }
    })
    .catch(err => {
      console.log('error : ', err)
    })
});

// router.post('/:buyerId/messages/:itemId', (req, res) => {
//   console.log('params ', req.params)
//   console.log('user ', req.user)
//   console.log('req.body', req.body)
//   let buyerId = req.params.buyerId;
//   let itemId = req.params.itemId;
//   let sellerId = req.user.id
//   let { message } = req.body
//   // res.send('test')
//   return Message
//     .where({
//       seller_id: sellerId,
//       buyer_id: buyerId,
//       itemId: itemId
//     })
//     .fetch()
//     .then(message => {
//       return new Message({
//         message:
//       })
//     })
//     .catch(err => {
//       console.log('error : ', err)
//     });
// })

// ===== CHANGE USER'S PASSWORD ===== //
router.put('/settings', (req, res) => {
  let username = req.user.username;
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) { return res.status(500); }
    bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
      if (err) { return res.status(500); }
      return User
        .where({ username })
        .save({ password: hashedPassword }, { patch: true })
        .then(user => {
          return res.json(user.attributes);
        })
        .catch(err => {
          console.log('error : ', err)
          return res.send('Unable to change password. Please try again later.')
        })
    })
  })
})

module.exports = router;  