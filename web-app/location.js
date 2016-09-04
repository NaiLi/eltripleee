'use strict';

let database = require('./database.js');

class Location {
	getLocationAtTime(patientId, time) {
    var patientlocation = database.getLocationData(patientId);

    if(patientlocation.length > 0) {
      return patientlocation[patientlocation.length-1].location;
    }
    else {
      return {long:0, lat: 0, floor: 2};
    }
	}
}

module.exports = new Location();
