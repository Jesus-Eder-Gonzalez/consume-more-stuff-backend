exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('conditions')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('conditions').insert([
        { name: 'New', rank: 1 },
        { name: 'Good', rank: 2 },
        { name: 'Fair', rank: 3 },
        { name: 'Worn', rank: 4 },
        { name: 'Used', rank: 5 }
      ]);
    });
};
