
exports.up = function(knex, Promise) {
  return knex.schema.createTable('items', table => {
    table.increments();
    table.string('description').notNullable();
    table.string('price');
    table.string('manufacturer_make');
    table.string('model_name_number');
    table.string('dimensions');
    table.text('notes_details');
    table.integer('views');
    table.integer('created_by').references('id').inTable('users').notNullable();
    table.integer('condition_id').references('id').inTable('conditions').notNullable();
    table.integer('category_id').references('id').inTable('categories').notNullable();
    table.integer('status_id').references('id').inTable('item_statuses').notNullable();
    table.integer('photo_id').references('id').inTable('photos').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('items');
};
