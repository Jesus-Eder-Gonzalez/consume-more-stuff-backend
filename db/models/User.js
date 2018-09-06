'use strict';

const bookshelf = require('./bookshelf');

class User extends bookshelf.Model {
  get tableName() {
    return 'users';
  }

  get hasTimeStamps() {
    return true;
  }

  userStatus() {
    return this.hasOne('UserStatus', 'id', 'status_id');
  }

  sellerMessages() {
    return this.hasMany('Message', 'seller_id', 'id');
  }

  toMessages() {
    return this.hasMany('Message', 'to', 'id');
  }

  fromMessages() {
    return this.hasMany('Message', 'from', 'id')
  }

  itemsPosted() {
    return this.hasMany('Item', 'created_by', 'id');
  }
}

module.exports = bookshelf.model('User', User);
