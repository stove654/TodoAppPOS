'use strict';

/**
 * @ngdoc function
 * @name appPosApp.controller:DiscountsCtrl
 * @description
 * # DiscountsCtrl
 * Controller of the appPosApp
 */
angular.module('appPosApp')
  .controller('DiscountsCtrl', function ($scope, localStorageService, OrderService) {
    $scope.discounts = angular.copy(localStorageService.get('discounts'));
    console.log($scope.discounts)

    $scope.addDiscount = function (item) {
      console.log(item)
      OrderService.updateDiscounts(angular.copy(item));
    }
  });
