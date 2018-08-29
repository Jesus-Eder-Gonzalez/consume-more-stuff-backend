const express = require('express');
const router = express.Router();
const Item = require('../../db/models/Item');

router.get('/', (req, res) => {
  return Item.query('orderBy', 'views')
    .fetchAll()
    .then(response => {
      // console.log(response);
      res.json(response);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get('/:id', (req, res) => {
  return new Item({ id: req.params.id })
    .fetch()
    .then(response => {
      console.log(response);
      res.json(response);
    })
    .catch(err => {
      console.log(err);
    });
});

router.put('/:id', (req, res) => {
  let {
    description,
    manufacturer_make,
    model_name_number,
    dimensions,
    notes_details,
    condition_id,
    category_id,
    status_id,
    photo_id,
  } = req.body;
  const id = req.params.id;
  return Item
    .where({ id })
    .save(
      {
        description,
        manufacturer_make,
        model_name_number,
        dimensions,
        notes_details,
        condition_id,
        category_id,
        status_id,
        photo_id,
      },
      {
        patch: true
      }
    )
    .then(item => {
      return res.json(item.attributes);
    })
    .catch(err => {
      console.log('err: ', err)
    })
})

module.exports = router;
