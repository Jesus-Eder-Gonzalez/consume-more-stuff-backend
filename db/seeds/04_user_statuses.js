exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user_statuses')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('user_statuses').insert([
        { name: 'Admin', rank: 1 },
        { name: 'Active', rank: 2 },
        { name: 'Flagged', rank: 3 },
        { name: 'Inactive', rank: 4 }
      ]);
    });
};
