var client = require('./connection.js');
var sitesJson = require("./testing_sites.json");
var bulkArray = [];

var makeBulkArray = function (sites, callback) {
  for (var current in sites) {
    bulkArray.push(
      { index: {_index: 'testing_sites', _id: sites[current].OBJECTID } },
      {
        id: sites[current].OBJECTID,
        globalid: sites[current].globalid,
        name: sites[current].testing_location_nameoperator,
        neighborhood: sites[current].Neighborhood,
        phone_number: sites[current].contact_phone_number,
        address: sites[current].testing_location_address,
        city: sites[current].City,
        zipcode: sites[current].zipcode,
        restrictions: sites[current].testing_restrictions,
        drive_thru: (sites[current].drive_thruwalk_up === 'dt' || sites[current].drive_thruwalk_up === 'both'),
        walk_up: (sites[current].drive_thruwalk_up === 'wu' || sites[current].drive_thruwalk_up === 'both'),
        referral: (sites[current].Referral === 'yes'),
        facility_type: sites[current].facility_type,
        provider_url: sites[current].ProviderURL,
        location: {
          lat: sites[current].Y,
          lon: sites[current].X
        },
        symptoms: sites[current].Symptoms,
        language_spoken: sites[current].Language_Spoken,
        translation_services: (sites[current].translation_services === 'Yes'),
        rapid_testing: (sites[current].rapid_testing === 'Yes'),
        age: sites[current].Age,
        notes: sites[current].Notes,
        monday_hours: sites[current].Monday,
        tuesday_hours: sites[current].Tuesday,
        wednesday_hours: sites[current].Wednesday,
        thursday_hours: sites[current].Thursday,
        friday_hours: sites[current].Friday,
        saturday_hours: sites[current].Saturday,
        sunday_hours: sites[current].Sunday
      }
    );
  }
  callback(bulkArray);
}

var indexSitesBulk = function (bulkArr, callback) {
  client.bulk({
    maxRetries: 5,
    index: 'testing_sites',
    type: '_doc',
    body: bulkArr
  }, function (err, resp, status) {
      if (err) {
        console.log(err);
      }
      else {
        callback(resp.items);
      }
  })
}

makeBulkArray(sitesJson, function (response) {
  console.log('Bulk Sites: \n');
  console.log(JSON.stringify(response, null, 2));

  indexSitesBulk(response, function (response){
    console.log(response);
  })
});