const express = require('express');
const router = express.Router();
const Category = require('../../db/models/Category');
const Item = require('../../db/models/Item');

router.get('/', (req, res) => {
  return Category.fetchAll()
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get('/:id/items', (req, res) => {
  const id = req.params.id
  return Item
    .query({ where: id })
    .fetchAll()
    .then(result => {
      console.log(result);
    })
})

module.exports = router;
