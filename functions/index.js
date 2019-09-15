const functions = require("firebase-functions");
const axios = require("axios");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.sendData = functions.https.onRequest((request, response) => {
  console.log(request.query.name);
  const axios = require("axios");
  const appID = "ZZpqmecjRUHLWYsTp6hp";
  const appCode = "d6xX406tT_Ss4sf4PSV4Eg";
  const lat = "43.4702626";
  const long = "-80.53592688";
  const meters = "1000";

  //   here is the string that logic

  findLeaveTimes = async stationID => {
    var urlDepartTimes = `https://transit.api.here.com/v3/board.json?lang=en&stnId=${stationID}&time=${new Date().toISOString()}%3A30%3A00&&app_id=${appID}&app_code=${appCode}`;
    var dataReturn = await axios
      .get(urlDepartTimes)
      .then(data => {
        console.log("here");
        return data.data.Res.NextDepartures.Dep;
      })
      .catch(error => {
        console.log(error);
      });
    console.log("Bet" + dataReturn);
    return dataReturn;
  };

  var url = `https://transit.api.here.com/v3/stations/by_geocoord.json?center=${lat}%2C${long}&radius=${meters}&app_id=${appID}&app_code=${appCode}&max=3`;

  var goodArray = [];

  return axios
    .get(url)
    .then(data => {
      var dataToSend = data.data.Res.Stations.Stn;
      dataToSend.forEach(dataSpecific => {
        //var times = findLeaveTimes(dataSpecific.id);

        goodArray.push([
          findLeaveTimes(dataSpecific.id),
          dataSpecific.distance,
          dataSpecific.name,
          dataSpecific.Transports,
          dataSpecific.id
        ]);
      });

      return response.send({
        goodArray
      });
    })
    .catch(error => {
      console.log(error);
    });
});

exports.moo = functions.https.onRequest((request, response) => {
  return response.json({
    no: "No Bitch"
  });
});
