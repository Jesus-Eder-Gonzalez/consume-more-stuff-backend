
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('message_statuses').del()
    .then(function () {
      // Inserts seed entries
      return knex('message_statuses').insert([
        {
          name: 'Unread',
          rank: 1
        },
        {
          name: 'Read',
          rank: 2
        },
        {
          name: 'Deleted',
          rank: 3
        }
      ]);
    });
};
