$(document).ready(function () {
  // Get references to page elements
  var $nameSearchText = $("#searchName");
  var $submitNameSearchButton = $("#submitSearchName");
  var $logParagraph = $("#log").hide();

  // The searchAPI object contains methods for each kind of request we'll make
  var searchAPI = {
      searchByName: function (name) {
        return $.ajax({
          url: "/search-name/" + name,
          type: "GET"
        });
      }
    };

  var handleSubmitNameSearch = function (event) {
    event.preventDefault();

    var searchTerm = $nameSearchText.val().trim();
    searchAPI.searchByName(searchTerm).then(function(resp) {
        var data = [];
        data[0] = ["ID", "Name", "Facility Type", "City", "Phone Number", "Website"];
        var hitsArray = resp.hits.hits;
        hitsArray.forEach(function(eachSite) {
          data.push([eachSite._id, eachSite._source.name, eachSite._source.facility_type, eachSite._source.city, eachSite._source.phone_number, eachSite._source.provider_url]);
        });

        var sitesTable = makeTable($("#tableDiv"), data);
    });
   
    // Clear out search field
    $submitNameSearchButton.val("");
  };

  function makeTable(container, data) {
    var table = $("<table/>").addClass('table table-striped');
    $.each(data, function(rowIndex, r) {
      var row = $("<tr/>");
      $.each(r, function(colIndex, c) {
          row.append($("<t"+(rowIndex == 0 ?  "h" : "d")+"/>").text(c));
      });
      table.append(row);
    });
    return container.html(table);
  }
  
  // Add event listeners to the submit button
  $submitNameSearchButton.on("click", handleSubmitNameSearch);
});