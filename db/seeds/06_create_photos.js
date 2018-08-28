
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('photos').del()
    .then(function () {
      // Inserts seed entries
      return knex('photos').insert([
        {link: 'http://placekitten.com/200/400'},
        {link: 'http://placekitten.com/300/400'},
        {link: 'http://placekitten.com/400/400'},
        {link: 'http://placekitten.com/300/500'},
        {link: 'http://placekitten.com/300/300'}
      ]);
    });
};
