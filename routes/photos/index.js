const express = require('express');
const router = express.Router();
const Photo = require('../../db/models/Photo');

router.get('/:id', (req, res) => {
  const id = req.params.id;
  return Photo
    .where({ id })
    .fetchAll()
    .then(photo => {
      res.json(photo);
    })
    .catch(err => {
      console.log('error : ', err)
    })
});

router.post('/', (req, res) => {
  let { link } = req.body;
  return new Photo({ link })
    .save()
    .then(newPhoto => {
      res.json(newPhoto);
    })
    .catch(err => {
      console.log('error : ', err)
    })
})

module.exports = router;