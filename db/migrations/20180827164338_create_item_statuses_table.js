
exports.up = function(knex, Promise) {
  return knex.schema.createTable('item_statuses', table => {
    table.increments();
    table.string('name');
    table.string('rank');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('item_statuses');
};
