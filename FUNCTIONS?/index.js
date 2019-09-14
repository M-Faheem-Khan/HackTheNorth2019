const express = require("express");
var GtfsRealtimeBindings = require("gtfs-rb").transit_realtime;
var request = require("request");
const app = express();

app.get("/", (req, response) => {
  // get coordinates
  // find the closest route (12, 24B)
  // search by prefrence
  // return [{time, distance, route, intersection}]

  var requestSettings = {
    method: "GET",
    url: "http://192.237.29.212:8080/gtfsrealtime/TripUpdates?{tripUpdate}",
    encoding: null
  };

  request(requestSettings, function(error, resp, body) {
    if (!error && resp.statusCode == 200) {
      var feed = GtfsRealtimeBindings.FeedMessage.decode(body);
      var data = [];
      feed.entity.forEach(function(entity) {
        data.push(entity);
      });
      response.send(JSON.stringify({ data: data }));
    }
  });

  console.timeEnd("HERE");
});

app.listen(3000, () => {
  console.log(`Example app listening on port 3000!`);
});
