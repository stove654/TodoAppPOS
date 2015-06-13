'use strict';

/**
 * @ngdoc function
 * @name appPosApp.controller:OrdersCtrl
 * @description
 * # OrdersCtrl
 * Controller of the appPosApp
 */
angular.module('appPosApp')
  .controller('OrdersCtrl', function ($scope, OrdersFactory) {

    $scope.orders = [];
    console.log('dsadsa');

    function _init () {
      OrdersFactory.getOrders().then(function (data) {
        $scope.orders = data;
        console.log(data);
      });
    }
    _init();
  });
