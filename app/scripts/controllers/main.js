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
    console.log($scope.order);

    $rootScope.$on('$stateChangeStart',
      function(event, toState, toParams, fromState, fromParams){
        console.log(toState)
        $scope.settingPos.url = toState.url;
      })

    $scope.selectPaymentMethodId = function (id) {
      OrderService.updatePaymentMethod(id);
    };

    $scope.settingPos.url = $state.current.url;
    function _init () {
      MainFactory.getTaxes();
      MainFactory.getDiscounts();
    }
    _init();
  });
