'use strict';

/**
 * @ngdoc function
 * @name IonicGulpSeed.controller:DetailsController
 * @description
 * # MainController
 * This controller handles the side menu
 */
angular.module('IonicGulpSeed')
  .controller('DetailsController', function($scope, $rootScope, $state, NewsService) {

    // do something with $scope
    $scope.locale = 'en';
    $scope.model = $rootScope.selectedLocation;

    if(!$scope.model){
      $state.go('app.home');
    }
    else {
      NewsService.getNewsByRegion('').then(function(data){
        $scope.newsModel = data;
      });

      $scope.options = {
        loop: false,
        effect: 'fade',
        speed: 500,
      };
    }



  });
