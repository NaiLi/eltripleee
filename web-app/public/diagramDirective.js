angular.module('eltripleee')
.directive('diagram', function() {
  return {
    restrict: 'E',
    template: "<div></div>",
    link: function(scope, element, attrs) {


      let $canvas = $('<canvas/>');
    
      $(element).append($canvas);
      let canvas = scope.canvas = $canvas[0];
      // element.find('canvas')[0];
      let context = scope.context = canvas.getContext('2d');
      
      let type = attrs.type;
      let roomId = attrs.roomid;

      let container = element[0].parentElement.parentElement;

      


      scope.$on('regenerateDiagrams', function(sender) {
        if (type === 'pulse') {
          canvas.width = container.clientWidth;
          canvas.height = 100;
          generateDiagramFromData(scope.$parent.roomData[roomId], type);
        } else {
          canvas.width = container.clientWidth;
          canvas.height = 0;
        }
      });





      function generateDiagramFromData(roomData, key) {
        let w = scope.canvas.width;
        let h = scope.canvas.height;

        let g = scope.context;
        context.clearRect(0, 0, w, h);
        g.beginPath();
        g.moveTo(0, h); // bottom left corner

        let maxVal = -1000000000;
        let minVal = 1000000000;

        if (key === 'pulse') {
          minVal = 0;
          maxVal = 100;
        }

        if (key === 'movement') {
          minVal = 512;
          maxVal = 1024;
        }

//        console.log(roomData.data);
        let n = roomData.data.length;
        
        
/*
        for (let i = n - 60; i < 60; i++) {
          let current = roomData.data[i];
          if (current) {
            maxVal = Math.max(maxVal, current[key]);
            minVal = Math.min(minVal, current[key]);
          }
        }*/

        let x = 0;
        let y = 0;

        for (let i = n - 60; i < n; i++) {
          
          y = h;
          let current = roomData.data[i];
          if (current) {
            let currentValue = current[key]; 
            
            y = h * (1 - ((currentValue - minVal) / (maxVal - minVal)));
          }
          g.lineTo(x, y);
          //console.log(x, y);
          x += w/59;
        }


        
        g.lineTo(w, h); // bottom left corner again
        g.lineTo(0, h); // bottom left corner again
        
        g.fillStyle = '#444';
        g.fill();
        
      }


      //console.log(type, roomId); 


      /*scope.$on('updateDiagram', function(sender) {

        var originalWidth = 1100;
        var originalHeight = 777;
        

        scope.context.beginPath();
        scope.context.arc(pixelLocation.x*widthRatio, pixelLocation.y*heightRatio, radius, 0, 2 * Math.PI, false);
        scope.context.fillStyle = '#4874ac';
        scope.context.fill();
        scope.context.lineWidth = 1;
        scope.context.strokeStyle = '#4874ac';
        scope.context.stroke();

      });*/
    }
  }
});
