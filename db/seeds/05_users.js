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
          password: '$2b$12$d5agevr/C6bDRew1KH.quO88FuRrZ4OkuIr0e8WOCAqnbImx3nw92',
          status_id: 1
        },
        {
          username: 'akl46',
          email: 'kylelewis@yahoo.com',
          password: '$2b$12$d5agevr/C6bDRew1KH.quO88FuRrZ4OkuIr0e8WOCAqnbImx3nw92',
          status_id: 2
        },
        {
          username: 'jimjam',
          email: 'JayMay@gmail.com',
          password: '$2b$12$d5agevr/C6bDRew1KH.quO88FuRrZ4OkuIr0e8WOCAqnbImx3nw92',
          status_id: 2
        },
        {
          username: 'finster',
          email: 'FinRight@gmail.com',
          password: '$2b$12$d5agevr/C6bDRew1KH.quO88FuRrZ4OkuIr0e8WOCAqnbImx3nw92',
          status_id: 2
        },
        {
          username: 'theking',
          email: 'JohnK@gmail.com',
          password: '$2b$12$d5agevr/C6bDRew1KH.quO88FuRrZ4OkuIr0e8WOCAqnbImx3nw92',
          status_id: 2
        },
        {
          username: 'likeg6',
          email: 'JeffGuzman@gmail.com',
          password: '$2b$12$d5agevr/C6bDRew1KH.quO88FuRrZ4OkuIr0e8WOCAqnbImx3nw92',
          status_id: 2
        }
      ]);
    });
};
