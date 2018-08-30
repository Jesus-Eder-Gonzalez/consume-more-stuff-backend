
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('messages').del()
    .then(function () {
      // Inserts seed entries
      return knex('messages').insert([
        {
          item_id: 1,
          seller_id: 1,
          buyer_id: 2,
          message: 'This is the first message'  
        },
        {
          item_id: 2,
          seller_id: 2,
          buyer_id: 3,
          message: 'This is the second message'  
        },
        {
          item_id: 3,
          seller_id: 3,
          buyer_id: 4,
          message: 'This is the third message'  
        },
        {
          item_id: 4,
          seller_id: 4,
          buyer_id: 1,
          message: 'This is the fourth message'  
        },
        {
          item_id: 1,
          seller_id: 1,
          buyer_id: 3,
          message: 'This is the fifth message'  
        }
      ]);
    });
};
