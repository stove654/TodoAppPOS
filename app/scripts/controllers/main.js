'use strict';

/**
 * @ngdoc function
 * @name appPosApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the appPosApp
 */
angular.module('appPosApp')
  .controller('MainCtrl', function ($scope, OrderService, MainFactory, $state, $rootScope) {
    $scope.settingPos = {};
    $scope.order = OrderService.getOrder();
    $scope.settingPos.url = $state.current.url;

    $rootScope.$on('$stateChangeStart',
      function(event, toState, toParams, fromState, fromParams){
        console.log(toState)
        $scope.settingPos.url = toState.url;
      });

    $scope.selectPaymentMethodId = function (id) {
      OrderService.updatePaymentMethod(id);
    };


    $scope.createOrder = function () {
      MainFactory.createOrder(angular.copy($scope.order)).then(function (data) {

      })
    };
    function _init () {
      MainFactory.getTaxes();
      MainFactory.getDiscounts();
      MainFactory.getTables();
    }
    _init();
  });
