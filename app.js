var client = require("./connection.js");
var express = require('express');
var app = express();
const path = require('path'); // Require library to help with filepaths

app.use(express.urlencoded({ extended: false })); // Middleware to recognize strings and arrays in requests
app.use(express.json()); // Middleware to recognize json in requests
app.use(express.static("public")); // Must have this or else access to index.js will 404

// Homepage route
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});

// Route to search for sites by name
app.get('/search-name/:name', function (req, res) {
    /* Query using slop to allow for unexact matches */
  client.search({
  index: 'testing_sites',
  type: '_doc',
  body: {
    "query": {  
      "match_phrase": {
        "name": { query: req.params.name, slop: 100 }
      }
    }
  }
  }).then(function (resp) {
      console.log("Successful query! Here is the response:", resp);
      res.send(resp);
  }, function (err) {
      console.trace(err.message);
      res.send(err.message);
  });
});

// app.get('/search-location/:name', function (req, res) {
  // client.search({
  //   index: 'testing_sites',
  //   type: '_doc',
  //   body: {
  //     "query": {
  //       "geo_bounding_box": { 
  //         "location": {
  //           "top_left": {
  //             "lat": 42,
  //             "lon": -72
  //           },
  //           "bottom_right": {
  //             "lat": 40,
  //             "lon": -74
  //           }
  //         }
  //       }
  //     }
  //   }
// })

// Start listening for requests on port 3000
app.listen(3000, function () {
  console.log('App listening for requests...');
});