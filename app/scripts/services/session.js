'use strict';

/**
 * @ngdoc service
 * @name appPosApp.session
 * @description
 * # session
 * Service in the appPosApp.
 */
angular.module('appPosApp')
  .service('SessionService', function (localStorageService, $state) {

    var session = {};

    session.isToken = function () {
      var isLoggedIn = false;
      if (localStorageService.get('user')) {
        var user = localStorageService.get('user');
        if (user.token) {
          isLoggedIn = true;
        }
      }
      return {
        isLoggedIn: isLoggedIn
      };
    };

    return session;
  });
