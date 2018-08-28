'use strict';

const bookshelf = require('./bookshelf');

class Message extends bookshelf.Model {
  get TableName() {
    return 'messages';
  }

  get hasTimeStamps() {
    return true;
  }

  buyer() {
    return this.hasOne('User', 'id', 'buyer_id');
  }

  seller() {
    return this.hasOne('User', 'id', 'seller_id');
  }

  item() {
    return this.hasOne('Item', 'id', 'item_id');
  }
}

module.exports = bookshelf.model('Message', Message);
