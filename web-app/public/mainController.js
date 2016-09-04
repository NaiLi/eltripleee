let socket = new WebSocket('ws://localhost:3000/');

angular.module('eltripleee', [])
  .controller('mainController', ['$scope', '$http', function($scope, $http) {

  $scope.title = "Postoperative department 1";
  $scope.subtitle = "University Hospital of Umeå";
  $scope.pulseDeviation = false;
  $scope.movementDeviation = false; 

  $http({
    method: 'GET',
    url: '/data'
  }).then(function successCallback(response) {
    console.log(response)
    $scope.roomData = response.data;
  }, function errorCallback(response) {
    console.log("error " + response.message);
  });


  $scope.feedData = {
    feed: [
    {
      roomNo: 5,
      message: "Abnormal heart rate",
      emergencyStatus: 30
    }, 
    {
      roomNo: 17,
      message: "Low activity",
      emergencyStatus: 20
    }, 
    {
      roomNo: 18,
      message: "Long since last check",
      emergencyStatus: 10
    }
  ]};

  socket.onopen = function() {
    console.log('Socket open.');
  };

  socket.onmessage = function(message) {
    //console.log('Socket server message', message);
    var data = JSON.parse(message.data);
    data.forEach((data) => {
      $scope.roomData[data.id].data.push(data);
      $scope.checkDeviation($scope.roomData[data.id]);
    });
  };

  $scope.selectedRoom;

  $scope.onRoomClick = function(id) {
    $scope.selectedRoom = $scope.roomData[id];
    $('#roominformationModal').modal('show');
  }

  $scope.checkDeviation = function(roomData) {
    if(!$scope.movementDeviation && $scope.checkMovementDevation(roomData)) {
      $scope.movementDeviation = true;
      $scope.createWarningToFeed(roomData, "movement", "Moving outside of limit", 10);
    }
    else if(!$scope.pulseDeviation && $scope.checkPulseDeviation(roomData)) {
      $scope.pulseDeviation = true;
      $scope.createWarningToFeed(roomData, "pulse", "High pulse", 20);
    }
  }

  $scope.checkMovementDevation = function(roomData) {
    return true;
    // IF lat > ....
  }

  $scope.checkPulseDeviation = function(roomData) {
    // Gör en grej!
    if($scope.roomData[0].datapulse > 90) {
      return true;
    }
    return false;
  }

  $scope.createWarningToFeed = function(roomData, type, message, status) {
    $scope.feedData.feed.push({
      roomNo: roomData.roomNo,
      message: message,
      emergencyStatus: status
    })
    $scope.$apply();
  }

}]);
