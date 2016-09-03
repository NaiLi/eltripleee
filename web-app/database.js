'use strict';
let fs = require('fs');

const filename = 'db.json'; 
let db = {};

if (fs.existsSync(filename)) {
  let input = fs.readFileSync(filename);
  db = JSON.parse(input);
}


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
}



/* data structure:
  id: {
    pulse: [
      startTime:
      endTime:
      beats: [time0, time1, ...]
    ],
    movement: [
      startTime: 
      sampleRate:
      data: [[x, y, z], [x, y, z]]
    ],
    location: [
      startTime:
      sampleRate
      data [[x, y, floor], [x, y, floor], ...]
    ]
  }
*/





module.exports = new Database();