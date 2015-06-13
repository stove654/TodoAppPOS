'use strict';

/**
 * @ngdoc service
 * @name appPosApp.OrdersFactory
 * @description
 * # OrdersFactory
 * OrdersFactory in the appPosApp.
 */
angular.module('appPosApp')
  .factory('OrdersFactory', function (AppConfig, $http, localStorageService) {

    var api = {};

    api.getOrders = function () {
      return $http.get(AppConfig.baseUrl + 'api/orders').then(function(data) {
        api.orders = data.data;
        return api.orders;
      });
    };
    return api;
  });
