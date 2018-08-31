
exports.up = function(knex, Promise) {
  return knex.schema.table('items', table => {
    table.dropColumn('photo_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('items', table => {
    table.integer('photo_id').references('id').inTable('photos').notNullable();
  })
};
