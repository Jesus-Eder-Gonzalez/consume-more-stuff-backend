'use strict';

const bookshelf = require('./bookshelf');

class ItemStatus extends bookshelf.Model {
  get tableName() {
    return 'item_statuses';
  }

  items() {
    return this.hasMany('Item', 'status_id', 'id');
  }
}

module.exports = bookshelf.model('ItemStatus', ItemStatus);
