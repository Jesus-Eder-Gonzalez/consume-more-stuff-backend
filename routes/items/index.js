const express = require('express');
const router = express.Router();
const Item = require('../../../db/models/Item');

router.get('/', (req, res) => {
  return Item.query('orderBy', 'views')
    .fetchAll()
    .then(response => {
      console.log(response);
      res.json(response);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get('/:id', (req, res) => {
  return Item({ id: req.params.id })
    .fetch()
    .then(response => {
      console.log(response);
      res.json(response);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
