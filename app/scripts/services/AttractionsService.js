'use strict';

/**
 * @ngdoc function
 * @name IonicGulpSeed.serive:AttractionsService
 * @description
 * # Attractions Service
 */
angular.module('IonicGulpSeed')
// use factory for services
  .factory('AttractionsService', function($http, $timeout, $q) {



    var _getAttractions = function() {
      var deferred = $q.defer();
      $http({
        url: 'data/attractions.json',
        params: {
        },
        method: 'GET'
      })
        .success(function(data) {
          deferred.resolve(data);
        })
        .error(function(error) {
          
        });

      return deferred.promise;
    };


    // public api
    return {
      getAttractions: _getAttractions
    };

  });
