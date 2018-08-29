const express = require('express');
const router = express.Router();
const Item = require('../../db/models/Item');

router.get('/', (req, res) => {
  return Item.query('orderBy', 'views')
    .fetchAll()
    .then(allItems => {
      res.json(allItems);
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
    .then(item => {
      res.json(item);
    })
    .catch(err => {
      console.log(err);
    });
});

router.post('/', (req, res) => {
  let created_by = req.user.id;
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
  // console.log('user id', created_by)
  return new Item({
    created_by: created_by,
    views: 0,
    description,
    manufacturer_make,
    model_name_number,
    dimensions,
    notes_details,
    condition_id,
    category_id,
    status_id,
    photo_id
  })
    .save()
    .then(newItem => {
      res.json(newItem)
    })
    .catch(err => {
      console.log('error : ', err);
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
  console.log(req.user)
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
