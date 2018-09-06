const express = require('express');
const router = express.Router();
const Category = require('../../db/models/Category');
const Item = require('../../db/models/Item');

router.get('/', (req, res) => {
  return Category
    .fetchAll()
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      console.log('error : ', err)
    });
});

router.get('/:id/items', (req, res) => {
  const category_id = req.params.id
  return Item
    .where({ category_id })
    .fetchAll({ withRelated: 'photos' })
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      console.log('error : ', err)
    })
})

module.exports = router;
