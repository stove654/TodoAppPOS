'use strict';

/**
 * @ngdoc function
 * @name appPosApp.controller:TaxesCtrl
 * @description
 * # TaxesCtrl
 * Controller of the appPosApp
 */
angular.module('appPosApp')
  .controller('TaxesCtrl', function ($scope, localStorageService, OrderService) {
    $scope.taxes = angular.copy(localStorageService.get('taxes'));

    $scope.addTax = function (item) {
      console.log(item)
      OrderService.updateTaxes(angular.copy(item));
    }
  });
