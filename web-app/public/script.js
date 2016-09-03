let socket = new WebSocket('ws://localhost:3000/');

socket.onopen = function() {
  console.log('Socket open.');
};

socket.onmessage = function(message) {
  //console.log('Socket server message', message);
  let data = JSON.parse(message.data);
  //console.log(data);
};
