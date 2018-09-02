const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const Busboy = require('busboy');

const Photo = require('../../db/models/Photo');
const Item = require('../../db/models/Item');

const BUCKET_NAME = 'consume-more-stuff-elite-four';
const IAM_USER_KEY = process.env.IAM_USER_KEY;
const IAM_USER_SECRET = process.env.IAM_USER_SECRET;

let itemId = null;



// ===== HELPER ===== //
function uploadToS3(userId, file) {
  const s3bucket = new AWS.S3({
    Bucket: BUCKET_NAME,
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET
  });
  s3bucket.createBucket(() => {
    const params = {
      Bucket: BUCKET_NAME,
      Key: `${userId}/${file.name}`,
      Body: file.data
    };
    s3bucket.upload(params, (err, data) => {

      if (err) {
        console.log(err);
      };
    });
  });
};

////////////

router.get('/', (req, res) => {
  return Item.query('orderBy', 'views')
    .fetchAll()
    .then(allItems => {
      res.json(allItems);
    })
    .catch(err => {
      console.log('error : ', err)
    });
});

router.get('/:id', (req, res) => {
  const id = req.params.id
  return Item
    .where({ id })
    .fetchAll({ withRelated: ['condition', 'category', 'itemStatus'] })
    .then(item => {
      res.json(item);
    })
    .catch(err => {
      console.log('error : ', err)
    });
});

router.post('/', (req, res) => {
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
      console.log('itemId : ', itemId);
      res.json(newItem);
    })
    .catch(err => {
      console.log('error : ', err)
    });
});

router.post('/photos', (req, res) => {
  const busboy = new Busboy({ headers: req.headers })
  console.log('req files', req.files);
  const file = req.files.fileUpload;
  const userId = req.user.id;
  // Hard code, find out how to pluck data.location
  const photoUrl = `https://${BUCKET_NAME}.s3.amazonaws.com/${userId}/${file.name}`;

  busboy.on('finish', () => {
    uploadToS3(userId, file)
  });

  return Item
    .where({ id: itemId })
    .then(item => {
      if (item) {
        return new Photo({
          item_id: itemId,
          link: photoUrl
        })
          .then(photo => {
            res.json(photo)
          })
      }
    })

  res.send({ success: 'Uploaded' })
  req.pipe(busboy);
});

router.put('/:id', (req, res) => {
  let {
    description,
    manufacturer_make,
    model_name_number,
    dimensions,
    notes_details,
    condition_id,
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
        status_id,
        photo_id,
      },
      {
        patch: true
      }
    )
    .then(() => {
      return Item
        .where({ id })
        .fetchAll({ withRelated: ['condition', 'category', 'itemStatus'] })
        .then(item => {
          console.log('item', item);
          return res.json(item);
        })
    })
    .catch(err => {
      console.log('error : ', err)
    })
})

module.exports = router;
