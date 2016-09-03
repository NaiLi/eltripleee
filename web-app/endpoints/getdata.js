'use strict';

let pulse = require('../pulse');
let movement = require('../movement');
let location = require('../location');
const patients = [
  {
    roomNo: 1,
    age: 42,
    gender: 'm'
  },
  {
    roomNo: 2,
    age: 63,
    gender: 'f'
  },
  {
    roomNo: 3,
    age: 81,
    gender: 'f'
  },
  {
    roomNo: 4,
    age: 76,
    gender: 'm'
  },
];


module.exports = function (req, res) {
  let end = (new Date()).getTime();
  let start = end - 1000 * 60;
  let interval = 60;

  let data = [];
  patients.forEach((v, patientId) => {
    let patientData = [];
    for (let t = start; t <= end; t += interval) {
      let timeData = { // time.
        time: t,
        pulse: pulse.getPulseAtTime(patientId, t),
        movement: movement.getMovementAtTime(patientId, t),
        location: location.getLocationAtTime(patientId, t)
      };
      patientData.push(timeData);
    }
    data[patientId] = {
      roomNo: patients[patientId].roomNo,
      gender: patients[patientId].gender,
      age: patients[patientId].age,
      data: patientData
    }
  });




  let json = JSON.stringify(data);
  res.send(json);
}