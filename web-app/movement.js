'use strict';

let database = require('./database.js');
const  movementThres = 10000;

class Movement {
	getMovementAtTime(patientId, time) {
    var patientMovement = database.getMovementData(patientId);
    var filteredMovement = patientMovement.filter( (mov) =>  { return time - mov.time < movementThres; });

    filteredMovement = filteredMovement.map( (mov) => { return mov.movement; });
    if(filteredMovement.length > 0) {
      var maxMovement = Math.max.apply(null, filteredMovement);
      return maxMovement;
    }
    else {
      return 0;
    }

	}
}

module.exports = new Movement();
