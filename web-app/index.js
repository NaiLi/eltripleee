'use strict';
let express = require('express');
let app = express();
let WSServer = require('ws').Server;
let server = require('http').createServer();
let database = require('./database');

let pulse = require('./pulse')

let bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


let postPulse = require('./endpoints/postpulse');
let postMovement = require('./endpoints/postmovement');
let postLocation = require('./endpoints/postlocation');
let getData = require('./endpoints/getdata');


app.use(express.static('public'));
app.get('/data', getData);
app.post('/pulse', postPulse);
app.post('/location', postLocation);

// Create web socket server on top of a regular http server
let wss = new WSServer({
  server: server
});

// Also mount the app here
server.on('request', app);

function streamDataToWebSocket(ws) {

  function stream() {
    if (ws.readyState === ws.OPEN) {
      let latestPulse = pulse.getPulseAtTime(0, (new Date()).getTime());

      let data = [{
        id: 0,
        pulse: latestPulse,
        time: (new Date()).getTime(),
        acceleration: 1.01,
        location: [1, 2, 3]
      }];

      let json = JSON.stringify(data);
      ws.send(json);
      setTimeout(stream, 1000);
    }
  };
  stream();
}

wss.on('connection', function connection(ws) {
  console.log('client connected.');
  streamDataToWebSocket(ws);
});


server.listen(3000, function() {
  console.log('server process started!');
});


function onInterrupted() {
  database.save();
  console.log('saved database');
  process.exit();
}

process.on('SIGINT', onInterrupted);
//process.on('uncaughtException', onInterrupted);