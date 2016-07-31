'use strict';

/**
 * @ngdoc function
 * @name IonicGulpSeed.serive:AttractionsService
 * @description
 * # Attractions Service
 */
angular.module('IonicGulpSeed')
// use factory for services
  .factory('NewsService', function($http, $timeout, $q) {



    var _getNewsByRegion = function(region) {
      var deferred = $q.defer();
      $http({
        url: 'data/news.json',
        params: {
        },
        method: 'GET'
      })
        .success(function(data) {
          deferred.resolve(data.rows);
        })
        .error(function(error) {
          
        });

      return deferred.promise;
    };


    // public api
    return {
      getNewsByRegion: function(region){
        return _getNewsByRegion(region);
      }
    };

  });
