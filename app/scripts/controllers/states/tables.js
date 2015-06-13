'use strict';

/**
 * @ngdoc function
 * @name appPosApp.controller:TableCtrl
 * @description
 * # TableCtrl
 * Controller of the appPosApp
 */
angular.module('appPosApp')
  .controller('TableCtrl', function ($scope, OrderService, localStorageService) {
    $scope.tables = angular.copy(localStorageService.get('tables'));
    $scope.sectorSelected = $scope.tables[0];
    console.log($scope.tables);

    $scope.selectSector = function (item) {
      $scope.sectorSelected = item;
    };

    $scope.selectTable = function (item) {
      OrderService.updateTable(angular.copy(item));
    }
  });
