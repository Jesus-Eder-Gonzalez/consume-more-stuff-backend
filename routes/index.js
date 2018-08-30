const express = require('express');
const router = express.Router();

const categories = require('./categories');
const categoryWithItems = require('./categories/items');
const auth = require('./user/auth');
const users = require('./user/index');
const items = require('./items');
const conditions = require('./conditions')

router.use('/', auth);
router.use('/user', users);
router.use('/items', items);
router.use('/categories', categories);
router.use('/conditions', conditions);
router.use('/categories/items', categoryWithItems);

module.exports = router;
