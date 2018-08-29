const express = require('express');
const router = express.Router();
const Item = require('../../db/models/Item');

router.get('/', (req, res) => {
  return Item.query('orderBy', 'views')
    .fetchAll()
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get('/:id', (req, res) => {
  const id = req.params.id
  return Item
    .where({ id })
    .fetchAll()
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
