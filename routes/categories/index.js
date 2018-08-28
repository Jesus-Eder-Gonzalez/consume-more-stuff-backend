const express = require('express');
const router = express.Router();
const Category = require('../../db/models/Category');

router.get('/', (req, res) => {
  return Category.fetchAll()
    .then(response => {
      console.log(response);
      res.json(response);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
