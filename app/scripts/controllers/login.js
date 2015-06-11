'use strict';

/**
 * @ngdoc function
 * @name appPosApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the appPosApp
 */
angular.module('appPosApp')
  .controller('LoginCtrl', function ($scope, AppConfig, loginService, localStorageService, SessionService, $state) {
    $scope.user = {};

    $scope.settingLogin = {};
    $scope.settingLogin.register = false;
    $scope.register = {};
    $scope.login = function () {
      loginService.login(angular.copy($scope.user))
        .then(function(data) {
          if (data.success == true) {
            localStorageService.set('user', data);
            $state.go('main.orders');
          }
        }, function(error) {

        });
    };

    $scope.userRegister = function () {
      loginService.create(angular.copy($scope.register))
        .then(function(data) {
          console.log(data)
        }, function(error) {

        });
    }

  });
