let socket = new WebSocket('ws://localhost:3000/');

angular.module('eltripleee', [])
  .controller('mainController', ['$scope', '$http', function($scope, $http) {

  $scope.title = "Postoperative department 1";
  $scope.subtitle = "University Hospital of Umeå";
  $scope.pulseDeviation = false;  
  $scope.movementDeviation = false;
  $scope.Math = window.Math;

  $http({
    method: 'GET',
    url: '/data'
  }).then(function successCallback(response) {
    $scope.roomData = response.data;
  }, function errorCallback(response) {
    console.log("error " + response.message);
  });

  $scope.feedData = {
    feed: [
    {
      id: 0,
      roomNo: 1,
      type: "pulse",
      message: "Abnormal heart rate",
      emergencyStatus: 30
    },
    {
      id: 6,
      roomNo: 7,
      type: "movement",
      message: "Low activity",
      emergencyStatus: 20
    },
    {
      id: 7,
      type: "movement",
      roomNo: 8,
      message: "Long since last check",
      emergencyStatus: 10
    }
  ]};

  socket.onopen = function() {
    console.log('Socket open.');
  };

  socket.onmessage = function(message) {
    //console.log('Socket server message', message);
    var allData = JSON.parse(message.data);
    allData.forEach((data) => {
      if ($scope.roomData === undefined) {
        return;
      }

      $scope.roomData[data.id].data.push(data);
      $scope.checkDeviation($scope.roomData[data.id]);
      $scope.checkMovementStatus($scope.roomData[data.id]);
      $scope.$broadcast('regenerateDiagrams');
      $scope.$apply();
    });
  };

  $scope.selectedRoom;

  $scope.onRoomClick = function(id) {
    $scope.selectedRoom = $scope.roomData[id];
    var dataLength = $scope.selectedRoom.data.length-1;
    var location = $scope.selectedRoom.data[dataLength].location.location;
    var floor = location.floor;
    var long = location.long;
    var lat = location.lat;
    $scope.$broadcast('roomSelect', floor, long, lat);
    $('#roominformationModal').modal('show');
  }

  $scope.checkDeviation = function(roomData) {
    if(!$scope.movementDeviation && $scope.checkMovementDevation(roomData)) {
      $scope.movementDeviation = true;
      $scope.createWarningToFeed(roomData, "location", "Moving outside of limit", 10);
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

  $scope.checkMovementStatus = function(roomData) {

  }

  $scope.createWarningToFeed = function(roomData, type, message, status) {
    $scope.feedData.feed.push({
      id: roomData.id,
      type: type,
      roomNo: roomData.roomNo,
      message: message,
      emergencyStatus: status
    })
    $scope.$apply();
  }

}]);
