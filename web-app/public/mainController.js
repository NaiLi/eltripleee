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
    var allData = JSON.parse(message.data);
    allData.forEach((data) => {
      if ($scope.roomData === undefined) {
        return;
      }

      $scope.roomData[data.id].data.push(data);
      $scope.checkDeviation();
      $scope.$apply();
    });
  };

  $scope.selectedRoom;

  $scope.onRoomClick = function(id) {
    $scope.selectedRoom = $scope.roomData[id];
    var dataLength = $scope.selectedRoom.data.length-1;
    var floor = $scope.selectedRoom.data[dataLength].location.floor;
    var long = $scope.selectedRoom.data[dataLength].location.long;
    var lat = $scope.selectedRoom.data[dataLength].location.lat;
    $scope.$broadcast('roomSelect', floor, long, lat);
    $('#roominformationModal').modal('show');
  }

  $scope.checkDeviation = function() {
    if(!$scope.movementDeviation && $scope.checkMovementDevation()) {
      $scope.movementDeviation = true;
      $scope.createWarningToFeed("pulse", "Moving outside of limit", 10);
    }
    else if(!$scope.pulseDeviation && $scope.checkPulseDeviation()) {
      $scope.pulseDeviation = true;
      $scope.createWarningToFeed("pulse", "High pulse", 20);
    }
  }

  $scope.checkMovementDevation = function() {
    return true;
    // IF lat > ....
  }

  $scope.checkPulseDeviation = function() {
    // Gör en grej!
    if($scope.roomData[0].datapulse > 90) {
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
    $scope.$apply();
  }

}]);
