'use strict';
let database = require('../database');

module.exports = function (req, res) {
  let data = req.body;
  
  let id = (data.id !== undefined) ? data.id : 0;
  let startTime = data.startTime;
  let endTime = data.endTime;
  let beats = [];

  data.beats.forEach((beatTime) => {
    beats.push(beatTime);
  });

  database.insertPulseData(id, {
    startTime: startTime,
    endTime: endTime,
    beats: beats
  });

  res.status(200).send();
}