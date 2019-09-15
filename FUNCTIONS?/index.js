const express = require("express");
var GtfsRealtimeBindings = require("gtfs-rb").transit_realtime;
var bodyParser = require("body-parser");
const app = express();
const request = require("request");
const axios = require("axios");

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true
  })
);

app.post("/", async (request, response) => {
  // get coordinates - this is the users inital position
  var lon = request.body.lon;
  var lat = request.body.lat;
  // GOOGLE MAPS
  // get the nearest intersection
  // get all bus routes 1km radius
  var x1 = lat + 0.01; // right
  var x2 = lat - 0.01; // left
  var y1 = lon + 0.01; // up
  var y2 = lon - 0.01; // down
  var origin = {
    x: lon,
    y: lat
  };
  var destination = {
    x: x2,
    y: y2
  };

  let resp = await getRoute(origin, destination);
  response.json(resp);
});

async function getRoute(origin, destination) {
  const axios = require("axios");
  const apiKey = "AIzaSyBJGFsr77qOwF6tEH24Yi7T5sm1R4W92fE";
  /*OBJECTS origin: {x, y}*/
  // returns routes from origin to destination,
  // origin {lon, lat}
  // destinatbody.dataion {lon, lat}
  //   var direction = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.x},${origin.y}&destination=${destination.x},${destination.y}&key=${apiKey}`;
  var direction = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.x},${origin.y}&destination=${destination.x},${destination.y}&mode=transit&key=${apiKey}`;
  console.log(direction);

  var url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${origin.x},${origin.y}&key=${apiKey}`;

  var returnable = await axios
    .get(url)
    .then(function(response) {
      // handle success
      returnable = response;
      return returnable;
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .finally(function() {
      return returnable.body;
    });
  return returnable.data;
}

app.listen(3000);
