'use strict';

const bookshelf = require('./bookshelf');

class Condtion extends bookshelf.Model {
  get TableName() {
    return 'conditions';
  }

  items() {
    return this.hasMany('Item', 'condition_id', 'id');
  }
}

module.exports = bookshelf.models('Condition', Condition);
