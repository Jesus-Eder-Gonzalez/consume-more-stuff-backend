const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const Busboy = require('busboy');

const Photo = require('../../db/models/Photo');
const Item = require('../../db/models/Item');

const BUCKET_NAME = 'consume-more-stuff-elite-four';
const IAM_USER_KEY = process.env.IAM_USER_KEY;
const IAM_USER_SECRET = process.env.IAM_USER_SECRET;

// ===== GET ONE IMAGE ===== //
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

// // ===== POST NEW IMAGE ===== //
// // Gets Item ID, attaches as item_id to Photo during POST
// router.post('/', (req, res) => {
//   const busboy = new Busboy({ headers: req.headers})
//   const file = req.files.fileUpload;
//   const userId = req.user.id;
//   // Hard code, find out how to pluck data.location
//   const photoUrl = `https://${BUCKET_NAME}.s3.amazonaws.com/${userId}/${file.name}`;

//   busboy.on('finish', () => {
//     uploadToS3(userId, file)
//   });

//   return Item
//     .where({})

//     .then(item => {
//       if (item) {
//         return new Photo({
//           item_id: item.id,
//           link: photoUrl
//         })
//       }
//     })

//   res.send({ success: 'Uploaded' })
//   req.pipe(busboy);
// });

// ===== HELPER ===== //
// function uploadToS3(userId, file) {
//   const s3bucket = new AWS.S3({ 
//     Bucket: BUCKET_NAME,
//     accessKeyId: IAM_USER_KEY,
//     secretAccessKey: IAM_USER_SECRET
//   });
//   s3bucket.createBucket(() => {
//     const params = {
//       Bucket: BUCKET_NAME,
//       Key: `${userId}/${file.name}`,
//       Body: file.data
//     };
//     s3bucket.upload(params, (err, data) => {
//       if (err) {
//         console.log(err);
//       };
//       return data.Location
//     });
//   });
// };

module.exports = router;