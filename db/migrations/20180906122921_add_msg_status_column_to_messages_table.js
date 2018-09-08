
exports.up = function(knex, Promise) {
  return knex.schema.table('messages', table => {
    table.integer('msg_status').references('id').inTable('message_statuses').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('message', table => {
    table.dropColumn('msg_status');
  })
};
