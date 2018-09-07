
exports.up = function(knex, Promise) {
  return knex.schema.createTable('message_statuses', table => {
    table.increments();
    table.string('name');
    table.string('rank').unique().notNullable()
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('message_statuses');
};
