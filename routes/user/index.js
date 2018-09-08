const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const saltRounds = 12;
const User = require('../../db/models/User');
const Item = require('../../db/models/Item');
const Message = require('../../db/models/Message');

const botEmail = process.env.BOT_EMAIL;
const api_key = process.env.MAILGUN_API_KEY;
const domain = process.env.DOMAIN;
const mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });

// ===== GET ALL OF USER'S ITEMS ===== //
router.get('/items', (req, res) => {
  if (req.user) {
    let id = req.user.id;
    return Item
      .where({ created_by: id })
      .fetchAll({ withRelated: ['itemStatus'] })
      .then(userItems => {
        res.json(userItems);
      })
      .catch(err => {
        console.log('error : ', err);
      });
  } else {
    res.json({ message: 'Please log in to see your items!' });
  };
});

// ===== MESSAGES ===== //

router.get('/messages/', (req, res) => {
  if (req.user) {
    return Message
      .query({
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
  };
});

router.post('/:toId/messages/:itemId', (req, res) => {
  //At this point req.body should contain all the fields necessary to create a new message.
  //The following fields are for validation checks
  let toId = Number(req.params.toId);
  let fromId = req.body.from;
  let seller_id = req.body.seller_id;
  let itemId = req.params.itemId;
  let userId = req.user.id;
  
  let emailBody = req.body.message;
  let item;

  let err;

  //These are various checks before a message is allowed to be posted.
  //The main ones are the item exists and that the seller isn't initiating contact.
  return Item
    .where({ id: itemId })
    .fetch()
    .then(itemResponse => {
      if (!itemResponse) {
        res.json({
          message:
            'The item does not exist, or you do not have permission to view this item.'
        });
      }
      item = itemResponse.attributes.description;
    })
    .then(() => {
      if (seller_id === fromId && seller_id !== toId) {
        return Message.where({ item_id: itemId, to: seller_id, from: toId })
          .fetch()
          .then(response => {
            if (!response) {
              return err = 'Seller is not allowed to initiate contact';
            };
          });
      } else if (seller_id === fromId && seller_id === toId) {
        return err = 'You are unable to send a message to yourself!';
      } else if (userId !== fromId) {
        return err = 'You cannot send a message as someone else!';
      };
    })
    .then(response => {
      if (response) {
        return res.json({ message: response });
      } else {
        return User
          .where({ id: toId})
          .fetch()
          .then(response => {
            let receiver = response.email;
            const data = {
              from: `CMS Elite Four <charizard@mailinator.com>`,
              to: `${receiver}`,
              subject: `You have a new notification regarding: ${item}`,
              text: `${emailBody}`
            };
            mailgun.messages().send(data, (error, body) => {
              if (error) { console.log(error); }
              console.log('data', data)
              console.log('body', body)
            });
            return new Message(req.body)
              .save()
              .then(newMessage => {
                res.json(newMessage);
              });
          });
        };
    });
});

// ===== CHANGE USER'S PASSWORD ===== //
router.put('/settings', (req, res) => {
  let username = req.user.username;
  let { oldPass, newPass } = req.body;
  return User
    .where({ username })
    .fetchAll()
    .then(user => {
      bcrypt.compare(oldPass, user.models[0].attributes.password)
      .then(result => {
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
        };
      });
    });
});

// ======= CHECK EXISTENCE OF USER NAMES AND EMAILS ========= //

router.get('', (req, res) => {
  let username;
  let email;
  if (req.query.username) {
    username = req.query.username;
    return User
      .where({ username })
      .fetch()
      .then(user => {
        console.log('checkusername', user);
        if (user) {
          return res.json({ usernameTaken: true });
        };
        return res.json({ usernameTaken: false });
      })
      .catch(err => {
        console.log('error: ', err);
      });
  }
  if (req.query.email) {
    email = req.query.email;
    return User
      .where({ email })
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
  };
});

module.exports = router;