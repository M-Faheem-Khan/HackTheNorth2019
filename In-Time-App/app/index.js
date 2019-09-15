import * as messaging from "messaging";
import { InTimeUI } from "./ui.js";

let ui = new InTimeUI();

ui.updateUI("disconnected");

// Listen for the onopen event
messaging.peerSocket.onopen = function() {
  ui.updateUI("loading");
  messaging.peerSocket.send("Hi!");
}

// Listen for the onmessage event
// When receiving an event message check the time delay and round to the nearest integer (0 to 3)
// And update the UI
messaging.peerSocket.onmessage = function(evt) {
  ui.updateUI("loaded", evt.data);
}

// Listen for the onerror event
messaging.peerSocket.onerror = function(err) {
  // Handle any errors
  ui.updateUI("error");
}