'use strict';
let fs = require('fs');

const filename = 'scene.json';
let db = {};

if (fs.existsSync(filename)) {
  let input = fs.readFileSync(filename);
  db = JSON.parse(input);
}

db.nPatients = 10;

class Database {
  getAVG(id) {
    let longAvg = 0;
    let latAvg = 0;

    db[0].location.forEach( (a) => {
      longAvg += a.location.long;
      latAvg += a.location.lat;
    });
    longAvg /= db[0].location.length;
    latAvg /= db[0].location.length;

    console.log(longAvg);
    console.log(latAvg);
  }
}

module.exports = new Database();


// Average position on stage:
// 15.561740079115143
// 58.39405553023432
