'use strict';

/**
 * @ngdoc service
 * @name appPosApp.login
 * @description
 * # login
 * Factory in the appPosApp.
 */
angular.module('appPosApp')
  .service('FoodService', function () {

    this.subTotalFood = function (item) {
      item.price = parseFloat(item.price);
      var optionPrice = angular.copy(item.price);
      angular.forEach(item.options, function(value, key) {
        if (value.selected) {
          value.price = parseFloat(value.price);
          optionPrice += value.price;
        }
      });
      angular.forEach(item.discounts, function(value, key) {
        if (value.selected) {
          value.amount = parseFloat(value.amount);
          optionPrice += value.amount;
        }
      });
      item.subTotal = optionPrice * item.quantity;
    }
  });
