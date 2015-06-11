'use strict';

/**
 * @ngdoc service
 * @name appPosApp.login
 * @description
 * # login
 * Factory in the appPosApp.
 */
angular.module('appPosApp')
  .service('OrderService', function () {
    var order = {
      orderNoSplit: [
        {
          name: 'Mains',
          foods: []
        },
        {
          name: 'Take aways',
          foods: []
        }
      ],
      orderSplit: [],
      discounts: [],
      taxes: [],
      paymentMethodId: 1,
      total: 0
    };

    this.updateItemsTakeAways = function (item) {
      order.orderNoSplit[1].foods.push(item);
      this.totalOrder();
    };

    this.updateItemsMains = function (item) {
      order.orderNoSplit[0].foods.push(item);
      this.totalOrder();
    };

    this.totalOrder = function () {
      order.total = 0;
      angular.forEach(order.orderNoSplit, function(value, key) {
        angular.forEach(value.foods, function(item, key) {
          order.total += item.subTotal;
        })
      });
    };

    this.updatePaymentMethod = function (id) {
      order.paymentMethodId = id;
    };

    this.getOrder = function () {
      return order;
    };

    this.clearOrder = function () {
      order = {
        orderNoSplit: [
          {
            name: 'Mains',
            foods: []
          },
          {
            name: 'Take away',
            foods: []
          }
        ],
        orderSplit: [],
        discounts: [],
        taxes: [],
        paymentMethodId: 1,
        total: 0
      };
    };

  });
