'use strict';

/**
 * @ngdoc function
 * @name IonicGulpSeed.controller:DetailsController
 * @description
 * # MainController
 * This controller handles the side menu
 */
angular.module('IonicGulpSeed')
  .controller('DetailsController', function($scope, $rootScope, $state, NewsService, DistanceService) {

    // do something with $scope
    $scope.locale = 'en';
    $scope.model = $rootScope.selectedLocation;

    $scope.setLanguage = function(lang){
      $scope.locale = lang;
    };

    if(!$scope.model){
      $state.go('app.home');
    }
    else {
      NewsService.getNewsByRegion('').then(function(data){
        $scope.newsModel = data;
      });

      /*
      DistanceService.getDistance({lat:33.8826, lng:151.2066}, {lat:$scope.model.gps.lat, lng:$scope.model.gps.lng}).then(function(data){

      });
      */

      $scope.options = {
        loop: false,
        effect: 'fade',
        speed: 500,
      };
    }



  });
