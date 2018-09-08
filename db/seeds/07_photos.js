
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('photos').del()
    .then(function () {
      // Inserts seed entries
      return knex('photos').insert([
        { link: 'https://cdn.discordapp.com/attachments/463796737123811348/487776921707347971/delorean.jpg', item_id: 1 },
        { link: 'https://cdn.discordapp.com/attachments/463796737123811348/487776929332723712/washing_machine.jpg', item_id: 2 },
        { link: 'https://cdn.discordapp.com/attachments/463796737123811348/487776920826675241/delllaptop.jpg', item_id: 3 },
        { link: 'https://cdn.discordapp.com/attachments/463796737123811348/487776926585454602/levonloveseat.jpg', item_id: 4 },
        { link: 'https://cdn.discordapp.com/attachments/463796737123811348/487776918360424459/crv.jpg', item_id: 5 },
        { link: 'https://cdn.discordapp.com/attachments/463796737123811348/487776923007844354/keurig_coffee_maker.jpg', item_id: 6 }
      ]);
    });
};
