
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('messages', table => {
    table.integer('from').notNullable().alter();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('messages', table => {
    table.integer('from').alter();
  });
};
