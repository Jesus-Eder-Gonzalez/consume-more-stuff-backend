'use strict';

const bookshelf = require('./bookshelf');
require('./ItemStatus');
require('./Condition');
require('./Category');

class Item extends bookshelf.Model {
  get tableName() {
    return 'items';
  }

  get hasTimeStamps() {
    return true;
  }

  messages() {
    return this.hasMany('Message', 'item_id', 'id');
  }

  condition() {
    return this.hasOne('Condition', 'id', 'condition_id');
  }

  category() {
    return this.hasOne('Category', 'id', 'category_id');
  }

  itemStatus() {
    return this.hasOne('ItemStatus', 'id', 'status_id');
  }

  photos() {
    return this.hasMany('Photo', 'id', 'photo_id');
  }
}

module.exports = bookshelf.model('Item', Item);
