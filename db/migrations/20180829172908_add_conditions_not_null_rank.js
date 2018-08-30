
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('conditions', table => {
    table.string('rank').notNullable().alter();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('conditions', table => {
    table.string('rank').unique().alter();
  });
};
