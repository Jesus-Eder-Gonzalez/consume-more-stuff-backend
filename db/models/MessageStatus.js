'use strict';

const bookshelf = require('./bookshelf');

class MessageStatus extends bookshelf.Model {
  get tableName() {
    return 'message_statuses';
  }

  messages() {
    return this.hasMany('Message', 'msg_status', 'id');
  }
}

module.exports = bookshelf.model('MessageStatus', MessageStatus);
