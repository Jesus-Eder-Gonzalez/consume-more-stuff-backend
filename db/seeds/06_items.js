
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('items').del()
    .then(function () {
      // Inserts seed entries
      return knex('items').insert([
        {
          description: 'DeLorean',
          price: '$55000',
          manufacturer_make: 'DeLorean Motor Company',
          model_name_number: '81\' Grey / 5 Speed',
          dimensions: '',
          notes_details: '',
          views: 0,
          created_by: 5,
          condition_id: 2,
          category_id: 1,
          status_id: 2
        },
        {
          description: 'Washing machine',
          price: 'willing to trade',
          manufacturer_make: 'Kenmore',
          model_name_number: 'front load',
          dimensions: '4 1/2 cubic feet',
          notes_details: '',
          views: 0,
          created_by: 2,
          condition_id: 3,
          category_id: 2,
          status_id: 2
        },
        {
          description: 'DELL INSPIRON 15 NOTEBOOK',
          price: '$300',
          manufacturer_make: 'DELL',
          model_name_number: 'INSPIRON 15',
          dimensions: '16 INCH SCREEN',
          notes_details: 'NOT WILLING TO BARTER',
          views: 0,
          created_by: 3,
          condition_id: 3,
          category_id: 3,
          status_id: 2
        },
        {
          description: 'levon loveseat',
          price: '800',
          manufacturer_make: '',
          model_name_number: '',
          dimensions: 'w:69.00" d:40.00" h:38.00"',
          notes_details: 'pillows and cushions included',
          views: 0,
          created_by: 4,
          condition_id: 4,
          category_id: 4,
          status_id: 4
        },
        {
          description: 'Honda CR-V',
          price: '',
          manufacturer_make: 'Honda',
          model_name_number: '04\' Model',
          dimensions: '',
          notes_details: 'Huge scratch on passenger\'s side, message me for details',
          views: 0,
          created_by: 1,
          condition_id: 5,
          category_id: 1,
          status_id: 3
        },
        {
          description: 'Keurig coffee maker',
          price: 'msg me for details',
          manufacturer_make: 'Keurig',
          model_name_number: 'R500',
          dimensions: '',
          notes_details: '',
          views: 0,
          created_by: 2,
          condition_id: 1,
          category_id: 2,
          status_id: 2
        },
      ]);
    });
};
