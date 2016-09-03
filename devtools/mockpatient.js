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

function postPulse() {
  let postData = {
    startTime: (new Date()).getTime() - 1000,
    endTime: (new Date()).getTime(),
    beats: [(new Date()).getTime() - 800, (new Date()).getTime() - 300]
  };
  post('pulse', postData);
}

function postLocation() {
  let postData = {
    startTime: (new Date()).getTime() - 1000,
    sampleRate: 1,
    locations: [{lat: 0, long: 1, floor: 0}]
  };
  post('location', postData);
}


(function loop() {
  postPulse();
  postLocation();
  setTimeout(loop, 1000);
})();
