'use strict';
class Movement {
	getMovementAtTime(patientId, time) {
		return ~~(512+Math.random()*512);
	}
}

module.exports = new Movement();
