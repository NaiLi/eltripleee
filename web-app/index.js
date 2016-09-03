'use strict';
let express = require('express');
let app = express();
let WSServer = require('ws').Server;
let server = require('http').createServer();
let database = require('./database');

let bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


let postPulse = require('./endpoints/postPulse');
//let postMovement = require('./endpoints/postMovement');
//let postLocation = require('./endpoints/postLocation');
let getData = require('./endpoints/getdata');


app.use(express.static('public'));
app.get('/data', getData);
app.post('/pulse', postPulse);

// Create web socket server on top of a regular http server
let wss = new WSServer({
  server: server
});

// Also mount the app here
server.on('request', app);

function streamDataToWebSocket(ws) {
  function stream() {
    let data = database.getLatestData();
    let json = JSON.stringify(data);
    ws.send(json);
    setTimeout(stream, 1000);
  };
  stream();
}

wss.on('connection', function connection(ws) {
  streamDataToWebSocket(ws);
});


server.listen(3000, function() {
  console.log('server process started!');
});