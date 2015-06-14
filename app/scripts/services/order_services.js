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
      room: {},
      orderNumber: 0,
      paymentMethodId: 1,
      totalTax: 0,
      totalDiscount: 0,
      totalNow: 0,
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

    function _checkTaxDiscount(item, array) {
      var check = false;
      for (var i = 0; i < array.length; i++) {
        if (item._id == array[i]._id) {
          check = true;
          break;
        }
      }
      return check
    }

    this.updateTaxes = function (item) {
      if (!_checkTaxDiscount(item, order.taxes) && order.orderNoSplit[0].foods.length || order.orderNoSplit[1].foods.length) {
        order.taxes.push(item);
        this.totalOrder();
      }
    };

    this.updateDiscounts = function (item) {
      if (!_checkTaxDiscount(item, order.discounts) && order.orderNoSplit[0].foods.length || order.orderNoSplit[1].foods.length) {
        order.discounts.push(item);
        this.totalOrder();
      }
    };

    this.selectedOrder = function (item) {
      order.orderNoSplit = item.orderNoSplit;
      order.orderSplit = item.orderSplit;
      order.discounts = item.discounts;
      order.taxes = item.taxes;
      order.room = item.room;
      order.orderNumber = item.orderNumber;
      order.paymentMethodId = item.paymentMethodId;
      order.totalTax = item.totalTax;
      order.totalDiscount = item.totalDiscount;
      order.totalNow = item.totalNow;
      order.total = item.total;
      order._id = item._id;
      this.totalOrder();
    };

    this.updateTable = function (item) {
      order.room = item;
    };

    this.totalOrder = function () {
      order.total = 0;
      angular.forEach(order.orderNoSplit, function(value, key) {
        angular.forEach(value.foods, function(item, key) {
          item.subTotal = parseFloat(item.subTotal);
          order.total += item.subTotal;
        })
      });
      order.totalNow = angular.copy(order.total);
      angular.forEach(order.taxes, function(item, key) {
        if (item.amount) {
          item.amount = parseFloat(item.amount)
          order.totalTax += item.amount;
        }
        if (item.percent) {
          item.percent = parseFloat(item.percent)
          order.totalTax += item.percent * order.totalNow / 100;
        }
      });
      angular.forEach(order.discounts, function(item, key) {
        if (item.amount) {
          item.amount = parseFloat(item.amount)
          order.totalDiscount += item.amount;
        }
        if (item.percent) {
          item.percent = parseFloat(item.percent)
          order.totalDiscount += item.percent * order.totalNow / 100;
        }
      });
      order.total = order.totalNow + order.totalTax - order.totalDiscount
    };

    this.updatePaymentMethod = function (id) {
      order.paymentMethodId = id;
    };

    this.updateOrderNumber = function (id) {
      order.orderNumber = id;
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
        room: {},
        orderNumber: 0,
        paymentMethodId: 1,
        totalTax: 0,
        totalDiscount: 0,
        totalNow: 0,
        total: 0
      };
    };

  });
