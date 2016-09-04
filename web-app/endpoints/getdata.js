'use strict';

let pulse = require('../pulse');
let movement = require('../movement');
let location = require('../location');
let oxygenSaturation = require('../oxygensaturation');
let database = require('../database');

let patients = [];
let nPatients = database.getNPatients();
for (let i = 0; i < nPatients; i++) {
  patients.push({
    roomNo: i+1
  });
}

module.exports = function (req, res) {
  let end = (new Date()).getTime();
  let start = end - 1000 * 60;
  let interval = 1000;

  let data = [];
  patients.forEach((v, patientId) => {
    let patientData = [];
    for (let t = start; t <= end; t += interval) {
      let timeData = { // time.
        time: t,
        pulse: pulse.getPulseAtTime(patientId, t),
        movement: movement.getMovementAtTime(patientId, t),
        location: location.getLocationAtTime(patientId, t),
        oxygenSaturation: oxygenSaturation.getSaturationAtTime(patientId, t),
      };
      patientData.push(timeData);
    }
    data[patientId] = {
      id: patientId,
      roomNo: patients[patientId].roomNo,
      data: patientData
    }
  });




  let json = JSON.stringify(data);
  res.send(json);
}
