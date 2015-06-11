'use strict';

/**
 * @ngdoc service
 * @name appPosApp.login
 * @description
 * # login
 * Factory in the appPosApp.
 */
angular.module('appPosApp')
  .factory('loginService', function (AppConfig, $http) {

    var api = {};

    api.login = function (params) {
      return $http.post(AppConfig.baseUrl + 'auth/local', params).then(function(data) {
        return data.data;
      });
    };

    api.create = function (params) {
      return $http.post(AppConfig.baseUrl + 'api/users', params).then(function(data) {
        return data.data;
      });
    };

    return api;
  });
