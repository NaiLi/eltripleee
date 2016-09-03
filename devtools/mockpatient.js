'use strict';
let http = require('http');

function postPulse() {

  let options = {
    hostname: 'localhost',
    port: 3000,
    path: '/pulse',
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

  let postData = {
    startTime: (new Date()).getTime() - 1000,
    endTime: (new Date()).getTime(),
    beats: [(new Date()).getTime() - 800, (new Date()).getTime() - 300]
  };

  req.write(JSON.stringify(postData));
  req.end();

}

(function loop() {
  postPulse();
  setTimeout(loop, 1000);
})();
