'use strict';
let database = require('../database');

module.exports = function (req, res) {
  let data = req.body;
  
  let id = (data.id !== undefined) ? data.id : 0;
  let startTime = data.startTime;
  let sampleRate = data.sampleRate;
  let locations = [];

  data.locations.forEach((locationData) => {
    locations.push(locationData);
  });

  database.insertLocationData(id, {
    startTime: startTime,
    sampleRate: sampleRate,
    locations: locations
  });

  res.status(200).send();
}