'use strict';
let http = require('http');

function post(endpoint, data) {
  let options = {
    hostname: 'localhost',
    port: 3000,
    path: '/' + endpoint,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  };

  let req = http.request(options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('Response: ' + chunk);
    });
  });

  req.write(JSON.stringify(data));
  req.end();
}

let newBeats = [];
(function heartbeat() {
  newBeats.push((new Date()).getTime());
  let theta = ((new Date()).getTime() % (1000 * 60)) / 1000 / 60 * 2 * Math.PI;
  let pulse = 75 + 10 * Math.cos(theta);
  setTimeout(heartbeat, 1000 * 60 / pulse);
})();

function postPulse() {
  let postData = {
    startTime: (new Date()).getTime() - 1000,
    endTime: (new Date()).getTime(),
    beats: newBeats
  };
  newBeats = [];
  post('pulse', postData);
}

function postLocation() {
  let postData = {
    time: (new Date()).getTime(),
    location: {long:15.561795268405373, lat: 58.39402064631776, floor: 2}
  };
  post('location', postData);
}

let currentAcceleration = 0;
function postMovement() {
  let postData = {
    time: (new Date()).getTime(),
    movement: currentAcceleration += (Math.random() * 100)
  };
  post('movement', postData);
}





(function loop() {
  postPulse();
  postLocation();
  postMovement();
  setTimeout(loop, 1000);
})();
