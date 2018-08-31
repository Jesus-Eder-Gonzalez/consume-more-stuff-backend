
exports.up = function(knex, Promise) {
  return knex.schema.table('photos', table => {
    table.integer('item_id').references('id').inTable('items');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('photos', table => {
    table.dropColumn('item_id');
  });
};
