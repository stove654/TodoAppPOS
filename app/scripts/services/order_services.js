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
          name: 'Take away',
          foods: []
        }
      ],
      orderSplit: [],
      discounts: [],
      taxes: [],
      total: 0
    };

    this.updateItemsTakeAway = function (item) {
      order.orderNoSplit[1].foods.push(item);
    };

    this.updateItemsMains = function (item) {
      order.orderNoSplit[0].foods.push(item);
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
        total: 0
      };
    };

  });
