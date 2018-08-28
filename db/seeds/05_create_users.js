exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'admin',
          email: 'admin@cm.s',
          password: 'password',
          status_id: 1
        },
        {
          username: 'KL46',
          email: 'kylelewis@yahoo.com',
          password: 'password',
          status_id: 2
        },
        {
          username: 'Jam',
          email: 'JayMay@gmail.com',
          password: 'password',
          status_id: 2
        },
        {
          username: 'Finster',
          email: 'FinRight@gmail.com',
          password: 'password',
          status_id: 2
        },
        {
          username: 'TheKing',
          email: 'JohnK@gmail.com',
          password: 'password',
          status_id: 2
        },
        {
          username: 'LikeG6',
          email: 'JeffGuzman@gmail.com',
          password: 'password',
          status_id: 2
        }
      ]);
    });
};
