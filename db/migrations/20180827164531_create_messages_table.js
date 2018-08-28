
exports.up = function(knex, Promise) {
  return knex.schema.createTable('messages', table => {
    table.increments();
    table.integer('seller_id').references('id').inTable('users').notNullable();
    table.integer('buyer_id').references('id').inTable('users').notNullable();
    table.integer('item_id').references('id').inTable('items').notNullable();
    table.text('message').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('messages');
};
