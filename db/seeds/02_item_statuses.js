exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('item_statuses')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('item_statuses').insert([
        { name: 'pending', rank: 1 },
        { name: 'published', rank: 2 },
        { name: 'sold', rank: 3 },
        { name: 'removed', rank: 4 }
      ]);
    });
};
