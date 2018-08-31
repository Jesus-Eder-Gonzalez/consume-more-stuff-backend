const express = require('express');
const router = express.Router();
const Condition = require('../../db/models/Condition');

router.get('/', (req, res) => {
  return Condition.fetchAll()
    .then(response => {
      console.log(response);
      res.json(response);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
