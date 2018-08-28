'use strict';

const bookshelf = require('./bookshelf');

class Condition extends bookshelf.Model {
  get tableName() {
    return 'conditions';
  }

  items() {
    return this.hasMany('Item', 'condition_id', 'id');
  }
}

module.exports = bookshelf.models('Condition', Condition);
