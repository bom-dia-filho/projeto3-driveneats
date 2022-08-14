"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var orders = document.querySelectorAll('.container-orders .orders');
var openModalBtn = document.querySelector('.confirmation > button');

var minimumOrder = _toConsumableArray(orders).map(function () {
  return null;
});

var enableButton = function enableButton(minimumOrder, button) {
  !minimumOrder.includes(null) ? button.disabled = false : button.disabled = true;
  if (button.disabled) button.innerHTML = "Selecione os 3 itens<br>para fechar o pedido";else button.innerHTML = " Fechar o pedido";
};

var removeCSSClassFromAll = function removeCSSClassFromAll(elements, CSSclass) {
  return elements.forEach(function (element) {
    return element.classList.remove(CSSclass);
  });
};

var addOrder = function addOrder(position, order) {
  return minimumOrder[position] = order;
};

var totalPrice = function totalPrice(minimumOrder) {
  return minimumOrder.map(function (order) {
    return Number(order.price.split(' ')[1].replace(',', '.'));
  }).reduce(function (acc, curr) {
    return acc + curr;
  }, 0).toFixed(2);
};

orders.forEach(function (orderList, i) {
  var orderListElements = orderList.querySelectorAll('.order');
  orderListElements.forEach(function (order) {
    order.addEventListener('click', function (e) {
      removeCSSClassFromAll(_toConsumableArray(orderListElements).filter(function (el) {
        return el !== order;
      }), 'active');
      var orderObject = order.classList.contains('active') ? null : {
        price: order.querySelector('.price').textContent,
        title: order.querySelector('.title').textContent
      };
      addOrder(i, orderObject);
      order.classList.toggle('active');
      enableButton(minimumOrder, openModalBtn);
    });
  });
});

var sendMsgToWhatsapp = function sendMsgToWhatsapp(minimumOrder) {
  var name = prompt("Diga seu nome:");
  var address = prompt("Diga seu endereco:");
  var msg = "Ol\xE1, gostaria de fazer o pedido:\n- Prato: ".concat(minimumOrder[0].title, "\n- Bebida: ").concat(minimumOrder[1].title, "\n- Sobremesa: ").concat(minimumOrder[2].title, "\nTotal: R$ ").concat(totalPrice(minimumOrder), "\nNome: ").concat(name, "\nEndere\xE7o: ").concat(address);
  if (!window.open("https://wa.me/5521974553791?text=".concat(encodeURI(msg)))) alert('Coe, teu navegador bloqueou o redirect.\nNa barra de endereço deve ter um icone com um x lá no final clica nele e permite.\nCaso não funcione no inicio da barra tem um icone tenta por lá.\nDe qualquer forma vou mandar a mensagem por aqui tb.\n' + msg);
};

var modal = document.querySelector('.modal');
var bgModal = document.querySelector('.bg');
var confirmationBtn = document.querySelector('.ok');
var abortBtn = modal.querySelector('.abort');

var toggleModal = function toggleModal(modal, minimumOrder) {
  modal.classList.toggle('open');
  var orders = modal.querySelector('.orders');
  orders.querySelectorAll('.order').forEach(function (order, i) {
    order.querySelector('span:nth-child(1)').textContent = minimumOrder[i].title;
    order.querySelector('span:nth-child(2)').textContent = minimumOrder[i].price;
  });
  orders.querySelector('.total span:nth-child(2)').textContent = 'R$ ' + totalPrice(minimumOrder).toString().replace('.', ',');
};

openModalBtn.addEventListener('click', function (e) {
  return toggleModal(modal, minimumOrder);
});
bgModal.addEventListener('click', function (e) {
  return toggleModal(modal, minimumOrder);
});
abortBtn.addEventListener('click', function (e) {
  return toggleModal(modal, minimumOrder);
});
confirmationBtn.addEventListener('click', function (e) {
  return sendMsgToWhatsapp(minimumOrder);
});