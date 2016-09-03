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

  getLatestData() {
    // Return mock data.
    // TODO: return real data.
    return {
      id: 0,
      pulse: 70,
      time: (new Date()).getTime(),
      acceleration: 1.01,
      location: [1, 2, 3]
    }
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