const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const saltRounds = 12;
const User = require('../../db/models/User');
const Item = require('../../db/models/Item');
const Message = require('../../db/models/Message');

// ===== GET ALL OF USER'S ITEMS ===== //
router.get('/items', (req, res) => {
  if (req.user) {
    let id = req.user.id;
    return Item
      .where({ created_by: id })
      .fetchAll({ withRelated: ['itemStatus', 'photos'] })
      .then(userItems => {
        res.json(userItems);
      })
      .catch(err => {
        console.log('error : ', err);
      });
  } else {
    res.json({ message: 'Please log in to see your items!' });
  }
});

// ===== MESSAGES ===== //

router.get('/messages/', (req, res) => {
  if (req.user) {
    return Message.query({
      where: { to: req.user.id }
    })
      .fetchAll({ withRelated: ['to', 'from', 'item'] })
      .then(response => {
        res.json(response);
      })
      .catch(err => {
        console.log('Error: ', err);
      });
  } else {
    res.json({ message: 'Please log in to proceed.' });
  }
});

router.post('/:toId/messages/:itemId', (req, res) => {
  //At this point req.body should contain all the fields necessary to create a new message.
  //The following fields are for validation checks
  let toId = req.params.toId;
  let fromId = req.body.from;
  let seller_id = req.body.seller_id;
  let itemId = req.params.itemId;
  let userId = req.user.id;

  //These are various checks before a message is allowed to be posted.
  //The main ones are the item exists and that the seller isn't initiating contact.
  return Item.where({
    id: itemId
  })
    .fetch()
    .then(item => {
      if (!item) {
        res.json({
          message:
            'The item does not exist, or you do not have permission to view this item.'
        });
      }
    })
    .then(() => {
      if (seller_id === fromId) {
        return Message.where({ item_id: itemId, to: seller_id, from: toId })
          .fetch()
          .then(response => {
            if (!response) {
              return res.json({ message: 'Seller is not allowed to initiate contact' });
            }
          });
      }
    })
    .then(() => {
      return new Message(req.body).save().then(newMessage => {
        res.json(newMessage);
      });
    });
});

// ===== CHANGE USER'S PASSWORD ===== //
router.put('/settings', (req, res) => {
  let username = req.user.username;
  let { oldPass, newPass } = req.body;
  return User.where({ username })
    .fetchAll()
    .then(user => {
      bcrypt.compare(oldPass, user.models[0].attributes.password).then(result => {
        if (result) {
          bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(newPass, salt, (err, hashedPassword) => {
              if (err) {
                return res.status(500);
              }
              return User.where({ username })
                .save({ password: hashedPassword }, { patch: true })
                .then(user => {
                  res.json({ message: 'success' });
                });
            });
          });
        } else {
          res.json({ message: `Wrong existing password` });
        }
      });
    });
});

// ======= CHECK EXISTENCE OF USER NAMES AND EMAILS ========= //

router.get('', (req, res) => {
  let username;
  let email;
  if (req.query.username) {
    username = req.query.username;
    return User.where({ username })
      .fetch()
      .then(user => {
        console.log('checkusername', user);
        if (user) {
          return res.json({ usernameTaken: true });
        }
        return res.json({ usernameTaken: false });
      })
      .catch(err => {
        console.log('error: ', err);
      });
  }
  if (req.query.email) {
    email = req.query.email;
    return User.where({ email })
      .fetch()
      .then(user => {
        console.log('checkemail', user);
        if (user) {
          return res.json({ emailTaken: true });
        }
        return res.json({ emailTaken: false });
      })
      .catch(err => {
        console.log('error: ', err);
      });
  }
});

module.exports = router;
