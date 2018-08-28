'use strict';

const bookshelf = require('./bookshelf');

class Category extends bookshelf.Model {
  get tableName() {
    return 'categories';
  }

  items() {
    return this.hasMany('Item', 'category_id', 'id');
  }
}

module.exports = bookshelf.model('Category', Category);
