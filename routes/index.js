const express = require('express');
const router = express.Router();

const categories = require('./categories');
const categoryWithItems = require('./categories/items');

router.use('/categories/items/', categoryWithItems);
router.use('/categories/', categories)

module.exports = router;
