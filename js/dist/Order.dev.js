"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Order =
/*#__PURE__*/
function () {
  function Order(element, orderChanged) {
    _classCallCheck(this, Order);

    this.load(element);
    this.handleClick(orderChanged);
  }

  _createClass(Order, [{
    key: "handleClick",
    value: function handleClick(orderChanged) {
      var _this = this;

      this.info.element.addEventListener('click', function (e) {
        _this.info.element.classList.toggle('active');

        orderChanged(_this.info.id);
      });
    }
  }, {
    key: "load",
    value: function load(element) {
      this.info = {
        element: element,
        price: element.querySelector('.price'),
        title: element.querySelector('.title'),
        id: element.getAttribute('data-id')
      };
    }
  }]);

  return Order;
}();