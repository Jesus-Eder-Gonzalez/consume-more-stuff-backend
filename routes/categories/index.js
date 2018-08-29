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

module.exports = router;
