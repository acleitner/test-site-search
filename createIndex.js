var client = require('./connection.js');

client.indices.create(
  {
    index: 'testing_sites',
    body: {
      mappings: {
        properties: {
          id: { type: 'integer' },
          globalid: { type: 'text' },
          name: { type: 'text' },
          neighborhood: { type: 'text' },
          phone_number: { type: 'text' },
          address: { type: 'text' },
          city: { type: 'text' },
          zipcode: { type: 'integer' },
          restrictions: { type: 'text' },
          drive_thru: { type: 'boolean' },
          walk_up: { type: 'boolean' },
          referral: { type: 'boolean' },
          facility_type: { type: 'text' },
          provider_url: { type: 'text' },
          location: { type: 'geo_point' },
          symptoms: { type: 'text' },
          language_spoken: { type: 'text' },
          translation_services: { type: 'boolean' },
          rapid_testing: { type: 'boolean' },
          age: { type: 'text' },
          notes: { type: 'text' },
          monday_hours: { type: 'text' },
          tuesday_hours: { type: 'text' },
          wednesday_hours: { type: 'text' },
          thursday_hours: { type: 'text' },
          friday_hours: { type: 'text' },
          saturday_hours: { type: 'text' },
          sunday_hours: { type: 'text' },
        }
      }
    }
  },
  function (err, resp, status) {
    if (err) {
      console.log(err);
    } else {
      console.log("Create index response: ", resp);
    }
  }
);