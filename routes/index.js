const express = require('express');
const router = express.Router();

const categories = require('./categories');
const categoryWithItems = require('./categories/items');
const auth = require('./user/auth');
const users = require('./user/index')
const items = require('./items')

router.use('/categories/items/', categoryWithItems);
router.use('/categories/', categories)
router.use('/', auth);
router.use('/user', users);
router.use('/items', items);

module.exports = router;
