var client = require('./connection.js');

client.indices.delete(
  {
    index: 'testing_sites'
  },
  function (err, resp, status) {
    if (err) {
      console.log(err);
    } else {
      console.log("Delete index response: ", resp);
    }
  }
);