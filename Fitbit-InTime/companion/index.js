import { me } from "companion";
import * as messaging from "messaging";
import { settingsStorage } from "settings";

import { GrtApi } from './api';
import { NUMBER_OF_ROUTES, PREFERRED_ROUTE_SETTING } from '../common/globals';

settingsStorage.onchange = (event) => {
  sendStopTimes();
}

messaging.peerSocket.onopen = () => {
  sendStopTimes();
}

messaging.peerSocket.onmessage = (event) => {
  console.log(JSON.stringify(event.data));
}

function sendStopTimes() {
  
  const preferredRoute = settingsStorage.getItem(0);
  
  const grtApi = new GrtApi();
  grtApi.getStopTimes(preferredRoute).then(times => {
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
      times.splice(NUMBER_OF_ROUTES); // keep only the first few times
      messaging.peerSocket.send(times);
    }
  }).catch(err => {
    console.log('encountered error while reading API')
    console.log(err);
  });
}
