'use strict';

/**
 * @ngdoc service
 * @name appPosApp.MainFactory
 * @description
 * # MainFactory
 * Factory in the appPosApp.
 */
angular.module('appPosApp')
  .factory('MainFactory', function (AppConfig, $http, localStorageService) {

    var api = {};

    api.getFoods = function () {
      return $http.get(AppConfig.baseUrl + 'api/foods/all-foods').then(function(data) {
        localStorageService.set('foods', data.data.data)
      });
    };

    api.getTaxes = function () {
      return $http.get(AppConfig.baseUrl + 'api/taxes').then(function(data) {
        angular.forEach(data.data, function(value, key) {
          _formatTaxDiscount(value)
        });
        localStorageService.set('taxes', data.data)
      });
    };

    api.getDiscounts = function () {
      return $http.get(AppConfig.baseUrl + 'api/discounts').then(function(data) {
        angular.forEach(data.data, function(value, key) {
          _formatTaxDiscount(value)
        });
        localStorageService.set('discounts', data.data)
      });
    };

    function _formatTaxDiscount(item) {
      item.amount = parseFloat(item.amount);
      item.percent = parseFloat(item.percent);
    }

    api.getTables = function () {
      return $http.get(AppConfig.baseUrl + 'api/tables').then(function(data) {
        localStorageService.set('tables', data.data)
      });
    };

    api.createOrder = function (params) {
      return $http.post(AppConfig.baseUrl + 'api/orders', params).then(function(data) {
        console.log(data)
      });
    };

    return api;
  });
