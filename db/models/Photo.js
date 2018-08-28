'use strict';

const bookshelf = require('./bookshelf');

class Photo extends bookshelf.Model {
  get TableName() {
    return 'photos';
  }

  get hasTimeStamps() {
    return true;
  }

  item() {
    return this.hasOne('Photo', 'photo_id', 'id');
  }
}

module.exports = bookshelf.model('Photo', Photo);
