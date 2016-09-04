angular.module('eltripleee')
.directive('map', function() {
  return {
    restrict: 'E',
    template: "<canvas id='mapcanvas'/>",
    link: function(scope, element, attrs) {
      scope.canvas = element.find('canvas')[0];
      scope.context = scope.canvas.getContext('2d');
      scope.floordata = [
        {
          lat: 58.39414318141268,
          lon: 15.562981715607679,
          orientation: -215.26687484718911,
          pixelPerMeter: 13.96671790886513
        },
        {
          lat: 58.39414433539133,
          lon: 15.562978684902191,
          orientation: -215.4194666207808,
          pixelPerMeter: 13.975893030386636
        },
        {
          lat: 58.39414382382847,
          lon: 15.562980234560753,
          orientation: -215.54742532832518,
          pixelPerMeter: 13.968985120135677
        }]
      scope.$on('roomSelect', function(sender, floor, longitude, latitude) {

        var originalWidth = 1100;
        var originalHeight = 777;
        img = document.getElementById("floor"+floor);
        var imgWidth = scope.canvas.width
        var imgHeight = scope.canvas.height

        var widthRatio = imgWidth/originalWidth;
        var heightRatio = imgHeight/originalHeight;
        var radius = imgHeight/20;
				var pixelLocation = scope.getPixelLocation(floor, longitude, latitude);
        scope.context.drawImage(img, 0, 0, imgWidth, imgHeight);
        scope.context.beginPath();
        scope.context.arc(pixelLocation.x*widthRatio, pixelLocation.y*heightRatio, radius, 0, 2 * Math.PI, false);
        scope.context.fillStyle = 'green';
        scope.context.fill();
        scope.context.lineWidth = 1;
        scope.context.strokeStyle = '#003300';
        scope.context.stroke();

      })

			scope.getPixelLocation = function(floor, longitude, latitude) {
				var f = scope.floordata[floor];
        var a = 6378137; // Equatorial earth radius
        var b = 6356752.314245; // Polar earth radius
        var r = 0.5*(a+b); // Average earth radius

        var deltaN = (latitude - f.lat) * Math.PI/180*r;
        var deltaW = -(longitude - f.lon) * Math.PI/180*r*Math.cos(f.lat*Math.PI/180.0);

        var deltaX = Math.cos(f.orientation*Math.PI/180.0)*deltaN - Math.sin(f.orientation*Math.PI/180.0)*deltaW;
        var deltaY = Math.sin(f.orientation*Math.PI/180.0)*deltaN + Math.cos(f.orientation*Math.PI/180.0)*deltaW;
        var x = -deltaY*f.pixelPerMeter;
        var y = -deltaX*f.pixelPerMeter;

        return {x: x, y:y}
			}
    }
  }
});
