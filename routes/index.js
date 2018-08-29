const express = require('express');
const router = express.Router();

const categories = require('./categories');
const categoryWithItems = require('./categories/items');
const auth = require('./user/auth');
const users = require('./user/index')

router.use('/categories/items/', categoryWithItems);
router.use('/categories/', categories)
router.use('/', auth);
router.use('/user', users);

module.exports = router;
