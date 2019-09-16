import { geolocation } from "geolocation";
import { NUMBER_OF_ROUTES } from "../common/globals";
export function GrtApi() {};


function locationSuccess(position) {
    console.log("Latitude: " + position.coords.latitude,
                "Longitude: " + position.coords.longitude);
  return SimpleFetch(position.coords.latitude, position.coords.longitude)
}

function locationError(error) {
  console.log("Error: " + error.code,
              "Message: " + error.message);
}

/**
 * Resolves `ms` after calling. Used to better simulate async
 * behaviour for us before we actually talk to the API. 
 */
function delay(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

/**
 * Generates a time `minutes` into the future. 
 */
function futureTime(minutes) {
  const ms = minutes * 60 * 1000;
  const now = new Date();
  const futureT = new Date(new Date().getTime() + ms);
  return futureT.getTime();
}

// fetch test

function SimpleFetch(lat,long){
  const dist = 1000;
  var url = "https://us-central1-transit-companion-app.cloudfunctions.net/sendData?lat="+lat+"&long="+long+"&meters="+dist;
  console.log(url)
  return fetch(url).then(function(response) { 
    console.log(response.data)
    console.log("It ran")
    return response;
  })
}

function getBusses(results) {
  // basically send off the time queries all at the same time
  // keep their pending completion in `promises`
  // and when all of `promises` resolves, we know the full array is ready
  let fullResults = [];
  let promises = [];
  let shortResults = results.splice(NUMBER_OF_ROUTES)
  shortResults.map(result => {
     result.transports.map(r => {
       let url = encodeURI("https://us-central1-transit-companion-app.cloudfunctions.net/sendData?stationId="+result.stnId+"&time="+ new Date().toISOString());
       console.log(url);
       let time = fetch(url).then(resp => Date.parse(resp.time))
       
       promises.push(time);
       fullResults.push({
         route: r.name,
         intersection: result.name,
         dest: r.dir,
         dist: result.distance,
         time
       });
     });
  });
  return promises.all().then(() => {
    return fullResults;
  });
}

GrtApi.prototype.getStopTimes = async () => {
  // let results;
  // await geolocation.getCurrentPosition(async pos => {
  //   console.log(pos);
  //   let short;
  //   try {
  //     console.log('shorty')
  //     short = await locationSuccess(pos);
  //     console.log(JSON.stringify(short));
  //   } catch (e) {
  //     console.log('wtf')
  //     console.log(e);
  //   }
  //   console.log(JSON.stringify(short));
  //   results = getBusses(short);
  // });
  return [
    { route: '12', dest: 'Boardwalk', intersection: 'University / King', time: futureTime(8), dist: 632 },
    { route: '31', dest: 'Boardwalk', intersection: 'Columbia / Philip', time: futureTime(3), dist: 991 },
    { route: '301', dest: 'Fairview', intersection: 'University of Waterloo', time: futureTime(9), dist: 1320 },
    { route: '301', dest: 'Conestoga', intersection: 'University of Waterloo', time: futureTime(12), dist: 1320 },
    { route: '29', dest: 'Fairview', intersection: 'University of Waterloo', time: futureTime(17), dist: 264 },
    { route: '5', dest: 'Kitchener', intersection: 'Uptown', time: futureTime(13), dist: 773 },
   ];
} 
