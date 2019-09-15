const functions = require("firebase-functions");
const axios = require("axios");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.sendData = functions.https.onRequest((request, response) => {
  const axios = require("axios");
  const appID = "ZZpqmecjRUHLWYsTp6hp";
  const appCode = "d6xX406tT_Ss4sf4PSV4Eg";
  const lat = "43.4643";
  const long = "80.5204";
  const meters = "1000";

  var url = `https://transit.api.here.com/v3/stations/by_geocoord.json?center=${lat}%2C${long}&radius=${meters}&app_id=${appID}&app_code=${appCode}&max=3`;
  axios
    .get(url)
    .then(data => {
      console.log(data);
      console.log(data.data);
    })
    .catch(error => {
      console.log(error);
    })
    .finally(data => {
      console.log(data);
    });
});
