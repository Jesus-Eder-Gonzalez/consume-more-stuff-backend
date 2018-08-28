
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_statuses', table => {
    table.increments();
    table.string('name');
    table.string('rank');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_statuses');
};
