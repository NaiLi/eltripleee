'use strict';
let database = require('../database');

module.exports = function (req, res) {
  let data = req.body;
  
  let id = (data.id !== undefined) ? data.id : 0;
  let time = data.time;
  let movement = data.movement;

  database.insertMovementData(id, {
    time: time,
    movement: movement
  });

  res.status(200).send();
}