exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user_statuses')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('user_statuses').insert([
        { name: 'admin', rank: 1 },
        { name: 'active', rank: 2 },
        { name: 'flagged', rank: 3 },
        { name: 'inactive', rank: 4 }
      ]);
    });
};
