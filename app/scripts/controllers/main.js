'use strict';

/**
 * @ngdoc function
 * @name appPosApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the appPosApp
 */
angular.module('appPosApp')
  .controller('MainCtrl', function ($scope, OrderService) {
    $scope.order = OrderService.getOrder();
    console.log($scope.order);

    $scope.selectPaymentMethodId = function (id) {
      OrderService.updatePaymentMethod(id);
    }
  });
