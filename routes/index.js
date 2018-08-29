const express = require('express');
const router = express.Router();

const categories = require('./categories');
const categoryWithItems = require('./categories/items');
const auth = require('./user/auth');
const item = require('./items')

router.use('/', auth);
router.use('/items', item);
router.use('/categories', categories)
router.use('/categories/items', categoryWithItems);

module.exports = router;
