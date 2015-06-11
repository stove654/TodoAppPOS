'use strict';

/**
 * @ngdoc function
 * @name appPosApp.controller:FoodsCtrl
 * @description
 * # FoodsCtrl
 * Controller of the appPosApp
 */
angular.module('appPosApp')
  .controller('FoodsCtrl', function ($scope, localStorageService, $ionicModal) {
    $scope.foods = [];
    $scope.category = {};
    $scope.food = {};

    $scope.foods = angular.copy(localStorageService.get('foods'));
    $scope.category = $scope.foods[0];

    $scope.selectCategory = function (item) {
      $scope.category = item;
    };

    $ionicModal.fromTemplateUrl('views/modals/modal_food.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modalFood = modal;
    });

    $scope.showFood = function (item) {
      $scope.food = angular.copy(item);
      $scope.food.quantity = 1;
      $scope.food.subTotal = angular.copy(parseFloat(item.price));
      $scope.modalFood.show();
    }

  });
