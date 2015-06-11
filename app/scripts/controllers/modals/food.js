'use strict';

/**
 * @ngdoc function
 * @name appPosApp.controller:FoodCtrl
 * @description
 * # FoodCtrl
 * Controller of the appPosApp
 */
angular.module('appPosApp')
  .controller('FoodCtrl', function ($scope, FoodService, OrderService) {

    $scope.selectOption = function (item) {
      if (!item.selected) {
        item.selected = true;
      } else {
        item.selected = false;
      }
      FoodService.subTotalFood($scope.food);
    };

    $scope.selectDiscount = function () {
      FoodService.subTotalFood($scope.food);
    };

    $scope.addQuantity = function () {
      $scope.food.quantity++;
      FoodService.subTotalFood($scope.food);
    };

    $scope.subQuantity = function () {
      if ($scope.food.quantity > 1) {
        $scope.food.quantity--;
        FoodService.subTotalFood($scope.food);
      }
    };

    $scope.closeModalFood = function () {
      $scope.modalFood.hide();
    };

    $scope.addFood = function () {
      if ($scope.food.isTakeAway) {
        OrderService.updateItemsTakeAways(angular.copy($scope.food))
      } else {
        OrderService.updateItemsMains(angular.copy($scope.food))
      }
      $scope.modalFood.hide();
    }

  });
