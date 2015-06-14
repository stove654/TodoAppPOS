'use strict';

/**
 * @ngdoc function
 * @name appPosApp.controller:OrdersCtrl
 * @description
 * # OrdersCtrl
 * Controller of the appPosApp
 */
angular.module('appPosApp')
  .controller('OrdersCtrl', function ($scope, OrdersFactory, OrderService) {

    $scope.orders = [];
    console.log('dsadsa');
    $scope.orderId = OrderService.getOrder()._id;

    $scope.selectedOrder = function (item) {
      OrderService.selectedOrder(angular.copy(item));
      $scope.orderId = OrderService.getOrder()._id;

      console.log(OrderService.getOrder())
    };

    function _init () {
      OrdersFactory.getOrders().then(function (data) {
        $scope.orders = data;
        console.log(data);
      });
    }
    _init();
  });
