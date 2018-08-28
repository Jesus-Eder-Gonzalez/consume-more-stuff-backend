'use strict';

const bookshelf = require('./bookshelf');

class UserStatus extends bookshelf.Model {
  get TableName() {
    return 'user_statuses';
  }

  get hasTimeStamps() {
    return true;
  }

  users() {
    return this.hasMany('User', 'status_id', 'id');
  }
}

module.exports = bookshelf.model('UserStatus', UserStatus);
