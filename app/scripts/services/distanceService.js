'use strict';

/**
 * @ngdoc function
 * @name IonicGulpSeed.serive:AttractionsService
 * @description
 * # Attractions Service
 */
angular.module('IonicGulpSeed')
// use factory for services
  .factory('DistanceService', function($http, $timeout, $q) {



    var _getDistance = function(org, dest) {
      var deferred = $q.defer();

      var origin = new google.maps.LatLng(org.lat, org.lng);
      var destination = new google.maps.LatLng(dest.lat, dest.lng);

      var service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [origin],
          destinations: [destination],
          travelMode: 'DRIVING',
          transitOptions: TransitOptions,
          drivingOptions: DrivingOptions,
          unitSystem: UnitSystem,
          avoidHighways: false,
          avoidTolls: false,
        }, function(response, status){
          deferred.resolve(response);
        });



      return deferred.promise;
    };


    // public api
    return {
      getDistance:function(org, dest){
        return _getDistance(org, dest);
      }
    };

  });


