'use strict';

/**
 * @ngdoc function
 * @name IonicGulpSeed.controller:DetailsController
 * @description
 * # MainController
 * This controller handles the side menu
 */
angular.module('IonicGulpSeed')
  .controller('DetailsController', function($scope, $rootScope) {

    // do something with $scope

    $scope.model = $rootScope.selectedLocation;

  });
