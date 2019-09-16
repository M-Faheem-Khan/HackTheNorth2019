import document from "document";
import { BUS_COLORS } from "../common/globals.js";
import { me } from "appbit";

let arrivedOnPage = false;

export function InTimeUI() {
  this.busList = document.getElementById("busList");
  this.statusText = document.getElementById("status");
  this.refreshRate = document.getElementById("refresh rate");
  this.arrivalPage = document.getElementById("arrivalPage");
  this.closingPage = document.getElementById("closingPage")
  this.tiles = [];
  this.up = document.getElementById("up");
  this.down = document.getElementById("down");
  // Need to charge this from hardcoded later
  for (let i = 0; i < 6; i++) {
    let tile = document.getElementById(`bus-${i}`);
    if (tile) {
      this.tiles.push(tile);
    }
  }
}



InTimeUI.prototype.updateUI = function(state, departures) {
  if (state === "loaded") {
    this.busList.style.display = "inline";
    this.statusText.text = "";
    this.refreshRate = "inline"
    
    this.updateDepartureList(departures);
  }
  else {
    this.busList.style.display = "none";

    if (state === "loading") {
      this.statusText.text = "Loading Bus Departures ...";
    }
    else if (state === "disconnected") {
      this.arrivalPage.style.display = "none"
      this.closingPage.style.display = "none"
      this.up.style.display = "none"
      this.down.style.display = "none"
      this.refreshRate.style.display = "none"
      this.statusText.text = "Please check connection to phone and Fitbit App"
    }
    else if (state === "error") {
      this.statusText.text = "Something terrible happened.";
    }
  }
}

function howManyMinutes(futureTimeStamp) {
  const currentTimeStamp = new Date().getTime();
  const ms = futureTimeStamp - currentTimeStamp;
  const minutes = ms / 1000 / 60;
  if (minutes < 0) {
    return "0";
  } 
  if (minutes < 1) {
    return "<1";
  }
  return Math.ceil(minutes);
}

document.onkeypress = function(e) {
  console.log("Key pressed: " + e.key);
  if (!arrivedOnPage) {
    document.getElementById("busList").style.display = "none"
    document.getElementById("refresh rate").style.display = "none"
    document.getElementById("arrivalPage").style.display = "inline";
    document.getElementById("up").style.display = "inline"
    document.getElementById("down").style.display = "inline"
    arrivedOnPage = true;
  } else {
    if (e.key = 'up') {
      console.log("Navigate to Closing");
      document.getElementById("arrivalPage").style.display = "none";
      document.getElementById("up").style.display = "none"
      document.getElementById("down").style.display = "none"
      document.getElementById("closingPage").style.display = "inline"
    } else if (e.key = 'down') {
      console.log("Navigate back to Listings");
      document.getElementById("arrivalPage").style.display = "none";
      document.getElementById("up").style.display = "none"
      document.getElementById("down").style.display = "none"
      document.getElementById("busList").style.display = "inline"
      document.getElementById("refresh rate").style.display = "inline"
    }
  }
}

InTimeUI.prototype.updateDepartureList = function(departures) {
  for (let i = 0; i < departures.length; i++) {
    let tile = this.tiles[i];
    if (!tile) {
      continue;
    }

    const bus = departures[i];
    if (!bus) {
      tile.style.display = "none";
      continue;
    }
    let colorId = tile.getElementById("color");
    colorId.getElementsByClassName("coloredShapes").forEach(e=>e.style.fill = BUS_COLORS[bus.route].background);
    tile.style.display = "inline";
    tile.getElementById("route").text = bus.route;
    tile.getElementById("route").style.fill = BUS_COLORS[bus.route].text || "#FFFFFF";
    tile.getElementById("intersection").text = bus.intersection;
    tile.getElementById("destination").text = bus.dest;
    tile.getElementById("eta").text = howManyMinutes(bus.time);
    tile.getElementById("distance").text = bus.dist;
  }
}
