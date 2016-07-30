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




      var options = {timeout: 10000, enableHighAccuracy: true};

      $cordovaGeolocation.getCurrentPosition(options).then(function(position){

        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        var mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);



        //Wait until the map is loaded
        google.maps.event.addListenerOnce($scope.map, 'idle', function(){

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

        });



      }, function(error){
        console.log("Could not get location");
      });
      
        





    });
