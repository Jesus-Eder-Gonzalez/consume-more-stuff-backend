
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('user_statuses', table => {
    table.string('rank').unique().alter();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('user_statuses', table => {
    table.string('rank').alter();
  });
};
