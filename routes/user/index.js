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
    .fetchAll({ withRelated: ['itemStatus'] })
    .then(userItems => {
      res.json(userItems);
    })
    .catch(err => {
      console.log('error : ', err)
    });
});

// ===== MESSAGES ===== //
router.get('/messages/:itemId', (req, res) => {
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

router.post('/:buyerId/messages/:itemId', (req, res) => {
  let buyerId = req.params.buyerId;
  let itemId = req.params.itemId;
  let sellerId = req.user.id;
  let { message } = req.body;

  return Item // Checks if item belongs to seller
    .where({
      id: itemId,
      created_by: sellerId
    })
    .fetch()
    .then(item => {
      if (!item) {
        res.json({ message: 'The item does not exist, or is not listed as yours.' });
      } else {
        return Message // Checks if messages exist between buyer and seller on a given item
          .where({
            seller_id: sellerId,
            buyer_id: buyerId,
            item_id: itemId
          })
          .fetch()
          .then(oldMessage => {
            if (!oldMessage) {
              res.json({ message: 'The seller is not able to initiate conversation!' });
            } else {
              return new Message({ // Creates new message, sent by seller to buyer
                buyer_id: buyerId,
                seller_id: sellerId,
                message,
                item_id: itemId
              })
                .save()
                .then(newMessage => {
                  res.json(newMessage);
                });
            };
          });
      };
    })
    .catch(err => {
      console.log('error : ', err);
    });
})

// ===== CHANGE USER'S PASSWORD ===== //
router.put('/settings', (req, res) => {
  let username = req.user.username;
  let {
    oldPass,
    newPass,
  } = req.body;
  return User
    .where({ username })
    .fetchAll()
    .then(user => {
      bcrypt.compare(oldPass, user.models[0].attributes.password)
        .then(result => {
          if (result) {
            bcrypt.genSalt(saltRounds, (err, salt) => {
              bcrypt.hash(newPass, salt, (err, hashedPassword) => {
                if (err) { return res.status(500); }
                return User
                  .where({ username })
                  .save({ password: hashedPassword }, { patch: true })
                  .then(user => {
                    res.json({ message: 'success' })
                  })
              })
            })
          } else {
            res.json({ message: `Wrong existing password` })
          }
        })
    })
})

module.exports = router;  