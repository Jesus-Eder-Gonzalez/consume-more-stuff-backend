
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('items').del()
    .then(function () {
      // Inserts seed entries
      return knex('items').insert([
        {
          description: '2017 jeep renegade',
          manufacturer_make: 'jeep',
          model_name_number: 'renegade',
          dimensions: 'dimensions filler',
          notes_details: 'this bad boy can fit so much junk',
          views: 0,
          created_by: 1,
          condition_id: 1,
          category_id: 1,
          status_id: 1,
          photo_id: 1,
        },
        {
          description: 'oven',
          manufacturer_make: 'manufacturer_make filler',
          model_name_number: 'model_name_number filler',
          dimensions: 'dimensions filler',
          notes_details: 'if i set it to 2000 degrees it should be done in two minutes',
          views: 0,
          created_by: 2,
          condition_id: 2,
          category_id: 2,
          status_id: 2,
          photo_id: 2,
        },
        {
          description: 'windows 10 notebook',
          manufacturer_make: 'manufacturer_make filler',
          model_name_number: 'model_name_number filler',
          dimensions: 'dimensions filler',
          notes_details: '>windows 10',
          views: 0,
          created_by: 3,
          condition_id: 3,
          category_id: 3,
          status_id: 3,
          photo_id: 3,
        },
        {
          description: 'couch',
          manufacturer_make: 'manufacturer_make filler',
          model_name_number: 'model_name_number filler',
          dimensions: 'dimensions filler',
          notes_details: 'notes_details filler',
          views: 0,
          created_by: 4,
          condition_id: 4,
          category_id: 4,
          status_id: 4,
          photo_id: 4,
        },
        {
          description: 'honda crv',
          manufacturer_make: 'manufacturer_make filler',
          model_name_number: 'model_name_number filler',
          dimensions: 'dimensions filler',
          notes_details: 'notes_details filler',
          views: 0,
          created_by: 1,
          condition_id: 2,
          category_id: 1,
          status_id: 2,
          photo_id: 5,
        },
      ]);
    });
};
