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
