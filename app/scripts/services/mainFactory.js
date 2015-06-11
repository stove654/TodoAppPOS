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
        localStorageService.set('taxes', data.data)
      });
    };

    api.getDiscounts = function () {
      return $http.get(AppConfig.baseUrl + 'api/discounts').then(function(data) {
        console.log(data.data);
        localStorageService.set('discounts', data.data)
      });
    };

    return api;
  });
