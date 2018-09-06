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
    return Item.where({ created_by: id })
      .fetchAll({ withRelated: ['itemStatus'] })
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
      where: { buyer_id: req.user.id },
      orWhere: { seller_id: req.user.id }
    })
      .fetchAll({withRelated: ['buyer', 'seller', 'item']})
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

// router.get('/messages/:itemId', (req, res) => {
//   if (req.user) {
//     let itemId = req.params.itemId;
//     let userId = req.user.id;
//     return Message
//       .query({
//         where: { buyer_id: userId, item_id: itemId },
//         orWhere: { seller_id: userId, item_id: itemId }
//       })
//       .fetchAll()
//       .then(messages => {
//         if (messages.length < 1) {
//           res.json({ message: 'You do not have permission to view this.' });
//         } else {
//           res.json(messages)
//         }
//       })
//       .catch(err => {
//         console.log('error : ', err);
//       });
//   } else {
//     res.json({ message: 'Please log in to see your inbox!' });
//   }
// });

router.post('/:buyerId/messages/:itemId', (req, res) => {
// router.post('/:buyerId/messages/:itemId', (req, res) => {
//   let buyerId = req.params.buyerId;
//   let itemId = req.params.itemId;
//   let userId = req.user.id;
//   let { message } = req.body;

//   return Item
//     .where({
//       // Checks if item belongs to seller
//       id: itemId,
//       created_by: userId
//     })
//     .fetch()
//     .then(item => {
//       console.log('item', item)
//       if (!item) {
//         res.json({ message: 'The item does not exist, or you do not have permission to view this message.' });
//       } else {
//         return Message.where({
//           // Checks if messages exist between buyer and seller on a given item
//           seller_id: userId,
//           buyer_id: buyerId,
//           item_id: itemId
//         })
//           .fetch()
//           .then(oldMessage => {
//             if (!oldMessage) {
//               res.json({ message: 'The seller is not able to initiate conversation!' });
//             } else {
//               return new Message({
//                 // Creates new message, sent by seller to buyer
//                 buyer_id: buyerId,
//                 seller_id: userId,
//                 message,
//                 item_id: itemId
//               })
//                 .save()
//                 .then(newMessage => {
//                   res.json(newMessage);
//                 });
//             }
//           });
//       }
//     })
//     .catch(err => {
//       console.log('error : ', err);
//     });
// });

router.post('/messages/:buyerId/:sellerId/:itemId', (req, res) => {
  let buyerId = req.params.buyerId;
  let sellerId = req.params.sellerId;
  let itemId = req.params.itemId;
  let userId = req.user.id;
  let { message } = req.body;

  return Item.where({
    // Checks if item belongs to seller
    id: itemId,
    created_by: sellerId
  })
    .fetch()
    .then(item => {
      console.log('item', item);
      if (!item) {
        res.json({
          message:
            'The item does not exist, or you do not have permission to view this message.'
        });
  return Item
    .where({ id })
    .fetch()
    .then(item => {
      if (!item) {
        res.json({ message: 'There was a problem processing your request. ' });
      } else {
        return Message
          .where({
            seller_id: sellerId,
            buyer_id: buyerId,
            itemId: itemId
          })
          .fetch()
          .then(oldMessage => {
            if (!oldMessage && sellerId === userId) {
              res.json({ message: 'The seller is not allowed to send the first message.' });
            } else {
              return new Message({
                buyer_id: buyerId,
                seller_id: sellerId,
                message: message,
                item_id: itemId
              })
                .save()
                .then(newMessage => {
                  res.json(newMessage);
                });
            };
          });
      };
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
