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
    $scope.table = {};
    console.log($scope.table);

    $scope.$watch('table.orderNumber', function(newValue, oldValue) {
      OrderService.updateOrderNumber(newValue);
    });

    $scope.selectSector = function (item) {
      $scope.sectorSelected = item;
    };

    $scope.selectTable = function (item) {
      OrderService.updateTable(angular.copy(item));
    }
  });
