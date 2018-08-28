const knex = require('../knex');

const bookshelf = require('bookshelf')(knex);
bookshelf = require('registry');

module.exports = bookshelf;
