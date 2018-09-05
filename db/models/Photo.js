'use strict';

const bookshelf = require('./bookshelf');

class Photo extends bookshelf.Model {
  get tableName() {
    return 'photos';
  }

  get hasTimeStamps() {
    return true;
  }

  item() {
    return this.hasOne('Item', 'id', 'item_id');
  }
}

module.exports = bookshelf.model('Photo', Photo);
