const express = require('express');
const router = express.Router();

const categoryWithItems = require('./categories/items');

router.use('/categories/items/', categoryWithItems);

module.exports = router;
