const express = require('express');
const router = express.Router();

const Photo = require('../../db/models/Photo');
const Item = require('../../db/models/Item');

const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const BUCKET_NAME = process.env.BUCKET_NAME;
const IAM_USER_KEY = process.env.IAM_USER_KEY;
const IAM_USER_SECRET = process.env.IAM_USER_SECRET;

const s3 = new aws.S3({
  accessKeyId: IAM_USER_KEY,
  secretAccessKey: IAM_USER_SECRET
})

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: BUCKET_NAME,
    acl: 'public-read-write',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname })
    },
    key: function (req, file, cb) {
      cb(null, `${req.user.username}/${Date.now().toString()}-${file.originalname}`)
    }
  })
})

router.get('/', (req, res) => {
  return Item.query(qb => {
    qb.orderBy('views', 'DESC');
  })
    .fetchAll({ withRelated: ['photos'] })
    .then(allItems => {
      res.json(allItems);
    })
    .catch(err => {
      console.log('error : ', err);
    });
});

router.put('/:id/views', (req, res) => {
  const id = req.params.id;
  return Item.query()
    .where({ id })

    .increment('views', 1)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      console.log('error : ', err);
    });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  return Item.where({ id })
    .query(qb => {
      qb.orderBy('views', 'DESC');
    })
    .fetchAll({ withRelated: ['condition', 'category', 'itemStatus', 'photos'] })
    .then(item => {
      res.json(item);
    })
    .catch(err => {
      console.log('error : ', err);
    });
});

//used to link image link to item_id
let itemId = null;

router.post('/', upload.array('photo', 6), (req, res) => {
  let {
    description,
    manufacturer_make,
    model_name_number,
    dimensions,
    notes_details,
    condition_id,
    category_id,
    status_id
  } = req.body;
  return new Item({
    description,
    manufacturer_make,
    model_name_number,
    dimensions,
    notes_details,
    condition_id,
    category_id,
    status_id,
    created_by: req.user.id,
    views: 0
  })
    .save()
    .then(newItem => {
      itemId = newItem.id;
      if (req.files.length === 0) {
        return res.json(newItem);
      } else {
        let promises = req.files.map(file => {
          return new Photo({
            item_id: itemId,
            link: file.location
          })
            .save()
        })
        Promise.all(promises)
          .then(() => {
            return res.json(newItem);
          })
      }
    })
    .catch(err => {
      console.log('error : ', err)
    });
});

router.put('/:id', upload.array('photo', 6), (req, res) => {
  let {
    description,
    manufacturer_make,
    model_name_number,
    dimensions,
    notes_details,
    condition_id,
    status_id,
    // photosToDelete
  } = req.body;
  const id = req.params.id;
  // console.log(photosToDelete);
  // if (photosToDelete.length > 0) {
  //   let promise = photosToDelete.map(link => {
  //     console.log(link);
  //     return Photo
  //       .where({ link, item_id: id })
  //       .destroy()
  //   })
  //   Promise.all(promise)
  //     .then(() => {
  //       return true;
  //     })
  // }
  return Item.where({ id })
    .save(
      {
        description,
        manufacturer_make,
        model_name_number,
        dimensions,
        notes_details,
        condition_id,
        status_id,
      },
      { patch: true }
    )
    .then(() => {
      if (req.files.length === 0) {
        return Item
          .where({ id })
          .fetchAll({ withRelated: ['condition', 'category', 'itemStatus', 'photos'] })
          .then(item => {
            return res.json(item);
          })
      } else {
        let promises = req.files.map(file => {
          return new Photo({
            item_id: id,
            link: file.location
          })
            .save()
        })
        Promise.all(promises)
          .then(() => {
            return Item.where({ id })
              .fetchAll({ withRelated: ['condition', 'category', 'itemStatus', 'photos'] })
              .then(item => {
                return res.json(item);
              })
          })
      }
    })
    .catch(err => {
      console.log('error : ', err);
    });
})

module.exports = router;