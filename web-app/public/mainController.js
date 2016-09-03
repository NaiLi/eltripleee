var eltripleee = angular.module('eltripleee', [])
  .controller('mainController', ['$scope', function($scope) {

  $scope.title = "Postoperative department 1";
  $scope.subtitle = "University Hospital of Umeå";

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
    feed: [ {
      roomNo: 5,
      message: "Abnormal heart rate",
      emergencyStatus: 10
    }, {
      roomNo: 17,
      message: "Low activity",
      emergencyStatus: 20
    }, {
      roomNo: 17,
      message: "Long since last check",
      emergencyStatus: 30
    }]
  };

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
    console.log("clicked on " + id);
    //$('body').append(modalTemplate(roomData.rooms[id]));
    //$('#roominformationModal').modal('show');
  }

  $scope.closeModal = function() {
    //console.log("closing modal")
    //$('body').remove('#roominformation');

    //$('#roominformationModal').modal('hide');
  }
}]);

