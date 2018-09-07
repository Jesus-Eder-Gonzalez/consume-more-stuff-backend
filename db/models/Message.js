'use strict';

const bookshelf = require('./bookshelf');

class Message extends bookshelf.Model {
  get tableName() {
    return 'messages';
  }

  get hasTimeStamps() {
    return true;
  }

  to() {
    return this.hasOne('User', 'id', 'to');
  }

  from() {
    return this.hasOne('User', 'id', 'from')
  }

  seller() {
    return this.hasOne('User', 'id', 'seller_id');
  }

  item() {
    return this.hasOne('Item', 'id', 'item_id');
  }

  msgStatus() {
    return this.hasOne('MessageStatus', 'id', 'msg_status')
  }
}

module.exports = bookshelf.model('Message', Message);
