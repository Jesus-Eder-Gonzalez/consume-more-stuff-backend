exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('item_statuses')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('item_statuses').insert([
        { name: 'Pending', rank: 1 },
        { name: 'Published', rank: 2 },
        { name: 'Sold', rank: 3 },
        { name: 'Removed', rank: 4 }
      ]);
    });
};
