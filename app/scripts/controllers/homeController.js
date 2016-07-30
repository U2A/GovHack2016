'use strict';

/**
 * @ngdoc function
 * @name IonicGulpSeed.controller:HomeController
 * @description
 * # HomeController
 */
angular.module('IonicGulpSeed')
    .controller('HomeController', function($scope, $cordovaGeolocation, AttractionsService) {


        /*
        $scope.fetchRandomText = function() {
            ExampleService.doSomethingAsync()
                .then(ExampleService.fetchSomethingFromServer)
                .then(function(response) {
                    $scope.myHTML = response.data.text;
                    // close pull to refresh loader
                    $scope.$broadcast('scroll.refreshComplete');
                });
        };
        */
        //$scope.fetchRandomText();


      function CustomMarker(latlng, map, imageSrc) {
        this.latlng_ = latlng;
        this.imageSrc = imageSrc;
        // Once the LatLng and text are set, add the overlay to the map.  This will
        // trigger a call to panes_changed which should in turn call draw.
        this.setMap(map);
      }

      CustomMarker.prototype = new google.maps.OverlayView();

      CustomMarker.prototype.draw = function () {
        // Check if the div has been created.
        var div = this.div_;
        if (!div) {
          // Create a overlay text DIV
          div = this.div_ = document.createElement('div');
          // Create the DIV representing our CustomMarker
          div.className = "customMarker"


          var img = document.createElement("img");
          img.src = this.imageSrc;
          div.appendChild(img);
          google.maps.event.addDomListener(div, "click", function (event) {
            google.maps.event.trigger(me, "click");
          });

          // Then add the overlay to the DOM
          var panes = this.getPanes();
          panes.overlayImage.appendChild(div);
        }

        // Position the overlay
        var point = this.getProjection().fromLatLngToDivPixel(this.latlng_);
        if (point) {
          div.style.left = point.x + 'px';
          div.style.top = point.y + 'px';
        }
      };

      CustomMarker.prototype.remove = function () {
        // Check if the overlay was on the map and needs to be removed.
        if (this.div_) {
          this.div_.parentNode.removeChild(this.div_);
          this.div_ = null;
        }
      };

      CustomMarker.prototype.getPosition = function () {
        return this.latlng_;
      };


      var renderMap = function(){
        var options = {timeout: 10000, enableHighAccuracy: true};

        $cordovaGeolocation.getCurrentPosition(options).then(function(position){

          var geocoder = new google.maps.Geocoder();

          var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          //center: latLng,

          var mapOptions = {
            zoom: 20,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };

          $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);



          //Wait until the map is loaded
          google.maps.event.addListenerOnce($scope.map, 'idle', function(){


            /*
            var marker = new google.maps.Marker({
              map: $scope.map,
              animation: google.maps.Animation.DROP,
              position: latLng
            });

            var infoWindow = new google.maps.InfoWindow({
              content: "Here I am!"
            });

            google.maps.event.addListener(marker, 'click', function () {
              infoWindow.open($scope.map, marker);
            });
            */

            geocoder.geocode( { 'address': $scope.selectedState.state}, function(results, status) {
              if (status == google.maps.GeocoderStatus.OK) {
                if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
                  if (results && results[0]
                    && results[0].geometry && results[0].geometry.viewport)
                    $scope.map.fitBounds(results[0].geometry.viewport);
                    $scope.map.setZoom($scope.selectedState.mapZoom);


                  for(var i=0;i<$scope.selectedState.locations.length;i++){
                    var location = $scope.selectedState.locations[i];
                    new CustomMarker(new google.maps.LatLng(location.gps.lat,location.gps.lng), $scope.map,  location.primaryImageUrl)
                  }





                } else {
                  alert("No results found");
                }
              } else {
                alert("Geocode was not successful for the following reason: " + status);
              }
            });

          });



        }, function(error){
          console.log("Could not get location");
        });
      };


      AttractionsService.getAttractions().then(function(data){
        $scope.attractions = data;
        $scope.selectedState = data[0];
        renderMap();
      });





      
        





    });
