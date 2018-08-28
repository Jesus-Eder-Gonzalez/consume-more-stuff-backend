exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('conditions')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('conditions').insert([
        { name: 'new', rank: 1 },
        { name: 'good', rank: 2 },
        { name: 'fair', rank: 3 },
        { name: 'worn', rank: 4 },
        { name: 'used', rank: 5 }
      ]);
    });
};
