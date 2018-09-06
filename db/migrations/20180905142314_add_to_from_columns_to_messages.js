
exports.up = function(knex, Promise) {
  return knex.schema.table('messages', table => {
    table.renameColumn('buyer_id', 'to');
    table.integer('from').references('id').inTable('users');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('messages', table => {
    table.renameColumn('to', 'buyer_id');
    table.dropColumn('from');
  });
};
