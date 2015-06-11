'use strict';

/**
 * @ngdoc function
 * @name appPosApp.controller:OrderCtrl
 * @description
 * # OrderCtrl
 * Controller of the appPosApp
 */
angular.module('appPosApp')
  .controller('OrderCtrl', function ($scope, OrderService) {

    $scope.order = OrderService.getOrder();
    console.log($scope.order);
  });
