const express = require('express');
const router = express.Router();

const categories = require('./categories');
const auth = require('./user/auth');
const conditions = require('./conditions');
const users = require('./user/');
const items = require('./items');
const photo = require('./photos');

router.use('/', auth);
router.use('/user', users);
router.use('/items', items);
router.use('/categories', categories);
router.use('/conditions', conditions);
router.use('/photos', photo);

module.exports = router;
