'use strict';
let fs = require('fs');

const filename = 'db.json'; 
let db = {};

if (fs.existsSync(filename)) {
  let input = fs.readFileSync(filename);
  db = JSON.parse(input);
}

db.nPatients = 10;

class Database {
  save() {
    let output = JSON.stringify(db);
    fs.writeFileSync(filename, output);
  }

  insertPulseData(id, data) {
    if (db[id] === undefined) {
      db[id] = {};
    }
    let patientData = db[id];
    if (patientData.pulse === undefined) {
      patientData.pulse = [];
    }
    patientData.pulse.push(data);
  }

  insertLocationData(id, data) {
    if (db[id] === undefined) {
      db[id] = {};
    }
    let patientData = db[id];
    if (patientData.location === undefined) {
      patientData.location = [];
    }
    patientData.location.push(data); 
  }

  insertMovementData(id, data) {
    if (db[id] === undefined) {
      db[id] = {};
    }
    let patientData = db[id];
    if (patientData.movement === undefined) {
      patientData.movement = [];
    }
    patientData.movement.push(data); 
  }

  getLocationData(id) {
    if (db[id] && db[id].location) {
      return db[id].location;
    } else {
      return [];
    }
  }

  getPulseData(id) {
    if (db[id] && db[id].pulse)
      return db[id].pulse;
    else 
      return [];
  }

  getMovementData(id) {
    if (db[id] && db[id].movement)
      return db[id].movement;
    else 
      return [];
  }

  getNPatients() {
    return db.nPatients;
  }
}



/* data structure:
  id: {
    pulse: [
      startTime: number,
      endTime: number,
      beats: [time0, time1, ...]
    ],
    movement: [
      time: number,
      data: [x, y, z]
    ],
    location: [
      time: number,
      data: {x: number, y: number, floor: number}
    ]
  }
*/





module.exports = new Database();