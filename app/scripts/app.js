'use strict';

/**
 * @ngdoc overview
 * @name appPosApp
 * @description
 * # appPosApp
 *
 * Main module of the application.
 */
angular
  .module('appPosApp', [
    'ionic',
    'LocalStorageModule',
    'angularMoment'
  ])

  .run(function ($rootScope, $state, $location, SessionService) {

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
      var shouldLogin = toState.data !== undefined
        && toState.data.requireLogin
        && !SessionService.isToken().isLoggedIn ;

      // NOT authenticated - wants any private stuff
      if(shouldLogin)
      {
        $state.go('login');
        event.preventDefault();
        return;
      }

      // authenticated (previously) comming not to root main
      if(SessionService.isToken().isLoggedIn)
      {
        var shouldGoToMain = fromState.name === ''
          && toState.name !== 'main.orders' ;
        return;
      }

    });
  })

  .config(function($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .state('main', {
        url: '/main',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        data : {requireLogin : true }
      })
      .state('main.orders', {
        url: '/orders',
        views: {
          'menuContent' :{
            templateUrl: 'views/states/orders.html',
            controller: 'OrdersCtrl',
            data : {requireLogin : true }
          }
        }
      })
      .state('main.taxes', {
        url: '/taxes',
        views: {
          'menuContent' :{
            templateUrl: 'views/states/taxes.html',
            controller: 'TaxesCtrl',
            data : {requireLogin : true }
          }
        }
      })
      .state('main.discounts', {
        url: '/discounts',
        views: {
          'menuContent' :{
            templateUrl: 'views/states/discounts.html',
            controller: 'DiscountsCtrl',
            data : {requireLogin : true }
          }
        }
      })
      .state('main.foods', {
        url: '/foods',
        views: {
          'menuContent' :{
            templateUrl: 'views/states/foods.html',
            controller: 'FoodsCtrl',
            data : {requireLogin : true }
          }
        }
      })
      .state('main.calculator', {
        url: '/calculator',
        views: {
          'menuContent' :{
            templateUrl: 'views/states/calculator.html',
            controller: 'CalculatorCtrl',
            data : {requireLogin : true }
          }
        }
      })
      .state('main.tables', {
        url: '/tables',
        views: {
          'menuContent' :{
            templateUrl: '../views/states/tables.html',
            controller: 'TableCtrl',
            data : {requireLogin : true }
          }
        }
      });

    $urlRouterProvider.otherwise('/main/orders');

    // Use x-www-form-urlencoded Content-Type
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/json';
    $httpProvider.defaults.headers.common['Content-Type'] = $httpProvider.defaults.headers.post['Content-Type'];
    $httpProvider.interceptors.push('loaderInterceptor');
    $ionicConfigProvider.views.transition('none');

  })

  .factory('loaderInterceptor', function($rootScope, $q, $location, localStorageService, $injector) {
    return {
      'request': function(config) {

        config.headers = config.headers || {};
        if (localStorageService.get('user')) {
          config.headers.Authorization = 'Bearer ' + localStorageService.get('user').token;
        }
        return config;
      },
      'responseError' : function(response){

        if (response.status == 401) {
          var state = $injector.get('$state');

          console.log(response);
          localStorageService.set('user', {});
          state.go('login');
        }
        return $q.reject(response);
      }
    };
  })


  .controller('AppCtrl', function ($scope, SessionService) {
    SessionService.isToken();
  });
