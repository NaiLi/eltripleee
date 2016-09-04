let socket = new WebSocket('ws://localhost:3000/');

angular.module('eltripleee', [])
  .controller('mainController', ['$scope', function($scope) {

  $scope.data; // data från armbandet
  var pulseHistoryArray = [];

  socket.onopen = function() {
    console.log('Socket open.');
  };

  socket.onmessage = function(message) {
    //console.log('Socket server message', message);
    $scope.data = JSON.parse(message.data);
    pulseHistoryArray.push($scope.data.pulse);
    $scope.checkDeviation();
  };


  $scope.title = "Avdelning XXX";

  $scope.roomData = {
    rooms: [
    {
      id: 0,
      roomNo: 1,
      age: 65,
      gender: "f",
      medData: {
        heartRate: 67,
        oxygenSaturation: 500
      },
      movement: 5,
      emergencyStatus: 10   
    },
    { 
      id: 1,
      roomNo: 2,
      age: 75,
      gender: "m",
      medData: {
        heartRate: 103,
        oxygenSaturation: 500
      },
      movement: 2,
      emergencyStatus: 20
    }
  ]};

  $scope.feedData = {
    feed: [
    {
      roomNo: 5,
      message: "Abnormal heart rate",
      emergencyStatus: 10
    }, 
    {
      roomNo: 17,
      message: "Low activity",
      emergencyStatus: 20
    }, 
    {
      roomNo: 17,
      message: "Long since last check",
      emergencyStatus: 30
    }
  ]};

  $scope.selectedRoom;
 // $scope.selectedRoom = $scope.roomData.rooms[0]; //TODO ta bort
  //$('#roominformationModal').modal('show'); //TODO ta bort

  $scope.individual = {
    id: 0, 
    pulse: 70, 
    time: 1472927439053, 
    acceleration: 1.01, 
    location: [1, 2, 3]
  }
/*
  var source   = $("#roomlist").html();
  var template = Handlebars.compile(source);
  $('body').append(template(roomData));

  var source   = $("#feedlist").html();
  var template = Handlebars.compile(source);
  $('body').append(template(feedData));


  var source   = $("#roominformation").html();
  var modalTemplate = Handlebars.compile(source);
  //$('body').append(modalTemplate(roomData.rooms[0])); //Lägg rätt person
*/
  $scope.onRoomClick = function(id) {
        $scope.roomData.rooms[0].roomNo = 999;
    console.log($scope.roomData.rooms[0].roomNo)
    console.log("clicked on " + id);
    $scope.selectedRoom = $scope.roomData.rooms[id];
    //$('body').append(modalTemplate(roomData.rooms[id]));
    $('#roominformationModal').modal('show');
  }

  $scope.checkDeviation = function() {
    if($scope.checkPulseDeviation()) {
      $scope.createWarningToFeed("pulse", "High pulse", 10);
    }
  }

  $scope.checkPulseDeviation = function() {
    // Gör en grej!
    if($scope.data.pulse > 3) {
      return true;
    }
    return false;
  }

  $scope.createWarningToFeed = function(type, message, status) {
    $scope.feedData.feed.push({
      roomNo: 201,
      message: message,
      emergencyStatus: status
    })
    $scope.feedData.feed[0].roomNo = 9;
  }

}]);

