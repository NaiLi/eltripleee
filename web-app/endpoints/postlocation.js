'use strict';
let database = require('../database');

module.exports = function (req, res) {
  let data = req.body;
  
  let id = (data.id !== undefined) ? data.id : 0;
  let time = data.time;
  let location = data.location;

  database.insertLocationData(id, {
    time: time,
    location: location
  });

  res.status(200).send();
}