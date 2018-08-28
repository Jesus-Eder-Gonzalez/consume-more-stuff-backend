'use strict';

const bookshelf = require('./bookshelf');

class Category extends bookshelf.Model {
  get tableName() {
    return 'categories';
  }

  items() {
    this.hasMany('Item', 'category_id', 'id');
  }
}

module.exports = bookshelf.model('Category', Category);
