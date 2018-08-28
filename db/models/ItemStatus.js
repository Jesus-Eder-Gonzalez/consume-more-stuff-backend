'use strict';

const bookshelf = require('./bookshelf');

class ItemStatus extends bookshelf.Model {
  get TableName() {
    return 'item_statuses';
  }

  items() {
    return this.hasMany('Item', 'status_id', 'id');
  }
}

module.exports = bookshelf.model('ItemStatus', ItemStatus);
