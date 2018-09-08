
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('messages').del()
    .then(function () {
      // Inserts seed entries
      return knex('messages').insert([
        {
          item_id: 1,
          seller_id: 1,
          to: 2,
          from: 1,
          message: 'This is the first message',
          msg_status: 1
        },
        {
          item_id: 2,
          seller_id: 2,
          to: 3,
          from: 2,
          message: 'This is the second message',
          msg_status: 2
        },
        {
          item_id: 3,
          seller_id: 3,
          to: 4,
          from: 3,
          message: 'This is the third message',
          msg_status: 3
        },
        {
          item_id: 4,
          seller_id: 4,
          to: 1,
          from: 4,
          message: 'This is the fourth message',
          msg_status: 1
        },
        {
          item_id: 1,
          seller_id: 1,
          to: 3,
          from: 1,
          message: 'This is the fifth message',
          msg_status: 2
        },
        {
          item_id: 5,
          seller_id: 1,
          to: 1,
          from: 4,
          message: 'This is the sixth message',
          msg_status: 3
        },
        {
          item_id: 5,
          seller_id: 1,
          to: 3,
          from: 1,
          message: 'This is the seventh message',
          msg_status: 1
        },
        {
          item_id: 2,
          seller_id: 2,
          to: 2,
          from: 3,
          message: 'This is the eighth message',
          msg_status: 2
        }
      ]);
    });
};
