"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DrivenOrder =
/*#__PURE__*/
function () {
  function DrivenOrder(element) {
    _classCallCheck(this, DrivenOrder);

    this.load(element);
    this.handleClick();
  }

  _createClass(DrivenOrder, [{
    key: "handleClick",
    value: function handleClick() {
      this.info.element.addEventListener('click', function (e) {
        e.target.classList.toggle('active');
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

  return DrivenOrder;
}();