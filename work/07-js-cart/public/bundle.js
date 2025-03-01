/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/model.js":
/*!**********************!*\
  !*** ./src/model.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addToCart: () => (/* binding */ addToCart),
/* harmony export */   checkout: () => (/* binding */ checkout),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   toggleCartVisibility: () => (/* binding */ toggleCartVisibility),
/* harmony export */   updateCartQuantity: () => (/* binding */ updateCartQuantity)
/* harmony export */ });
var model = {
  products: {
    1: {
      id: 1,
      name: "Jorts",
      price: 0.99,
      imgUrl: "http://placehold.co/150x150?text=Jorts"
    },
    2: {
      id: 2,
      name: "Jean",
      price: 3.14,
      imgUrl: "http://placehold.co/150x150?text=Jean"
    },
    3: {
      id: 3,
      name: "Nyancat",
      price: 2.73,
      imgUrl: "http://placehold.co/150x150?text=Nyancat"
    }
  },
  cart: {},
  showCart: false
};
var addToCart = function addToCart(productId) {
  if (model.cart[productId]) {
    model.cart[productId].quantity += 1;
  } else {
    var product = model.products[productId];
    if (product) {
      model.cart[productId] = {
        product: product,
        quantity: 1
      };
    }
  }
};
var updateCartQuantity = function updateCartQuantity(productId, quantity) {
  if (quantity <= 0) {
    delete model.cart[productId];
  } else {
    model.cart[productId].quantity = quantity;
  }
};
var toggleCartVisibility = function toggleCartVisibility() {
  model.showCart = !model.showCart;
};
var checkout = function checkout() {
  model.cart = {};
  model.showCart = false;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (model);

/***/ }),

/***/ "./src/view.js":
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var _model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model.js */ "./src/model.js");

function renderProducts(model, appEl) {
  var productListHtml = Object.values(model.products).map(function (product) {
    return "\n      <div class=\"product\">\n        <img src=\"".concat(product.imgUrl, "\" alt=\"this is ").concat(product.name, "\">\n        <p>").concat(product.name, " - $").concat(product.price.toFixed(2), "</p>\n        <button class=\"add-to-cart\" data-id=\"").concat(product.id, "\">Add to Cart</button>\n      </div>");
  }).join("");
  var totalQuantity = 0;
  for (var _i = 0, _Object$values = Object.values(model.cart); _i < _Object$values.length; _i++) {
    var item = _Object$values[_i];
    totalQuantity += item.quantity;
  }
  var viewCart = !model.showCart ? "<button id=\"view-cart\" class=\"view-cart\">View Cart (".concat(totalQuantity, ")</button>") : "";
  appEl.innerHTML = "\n    <div class=\"product-list\">".concat(productListHtml, "</div>\n    ").concat(viewCart, "\n  ");
}
function renderCart(model, appEl) {
  var cartListHtml = Object.values(model.cart).map(function (_ref) {
    var product = _ref.product,
      quantity = _ref.quantity;
    return "\n      <div class=\"cart-item\">\n        <img src=\"".concat(product.imgUrl, "\" alt=\"this is ").concat(product.name, "\">\n        <p>").concat(product.name, " - $").concat(product.price.toFixed(2), " x ").concat(quantity, " = $").concat((product.price * quantity).toFixed(2), "</p>\n        <label for=\"quantity-").concat(product.id, "\">Quantity:</label>\n        <input type=\"number\" id=\"quantity-").concat(product.id, "\" value=\"").concat(quantity, "\" data-id=\"").concat(product.id, "\" class=\"update-quantity\" />\n      </div>");
  }).join("");
  var totalPrice = 0;
  for (var _i2 = 0, _Object$values2 = Object.values(model.cart); _i2 < _Object$values2.length; _i2++) {
    var _Object$values2$_i = _Object$values2[_i2],
      product = _Object$values2$_i.product,
      quantity = _Object$values2$_i.quantity;
    totalPrice += product.price * quantity;
  }
  appEl.innerHTML += "\n    <div class=\"cart ".concat(model.showCart ? "open" : "", "\">\n      <h2>Cart</h2>\n      ").concat(cartListHtml || "<p>Nothing in the cart</p>", "\n      <p class=\"cart-total\">Total: $").concat(totalPrice.toFixed(2), "</p>\n      <button id=\"checkout\" class=\"checkout\">Checkout</button>\n      <button id=\"hide-cart\" class=\"hide-cart\">Hide Cart</button>\n    </div>\n  ");
}
function render(model, appEl) {
  renderProducts(model, appEl);
  if (model.showCart) {
    renderCart(model, appEl);
  }
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!***************************!*\
  !*** ./src/controller.js ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model.js */ "./src/model.js");
/* harmony import */ var _view_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view.js */ "./src/view.js");


var appEl = document.querySelector("#app");
(0,_view_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_model_js__WEBPACK_IMPORTED_MODULE_0__["default"], appEl);
appEl.addEventListener("click", function (e) {
  if (e.target.classList.contains("add-to-cart")) {
    var productId = parseInt(e.target.dataset.id, 10);
    (0,_model_js__WEBPACK_IMPORTED_MODULE_0__.addToCart)(productId);
    (0,_view_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_model_js__WEBPACK_IMPORTED_MODULE_0__["default"], appEl);
  }
  if (e.target.id === "view-cart" || e.target.id === "hide-cart") {
    (0,_model_js__WEBPACK_IMPORTED_MODULE_0__.toggleCartVisibility)();
    (0,_view_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_model_js__WEBPACK_IMPORTED_MODULE_0__["default"], appEl);
  }
  if (e.target.id === "checkout") {
    (0,_model_js__WEBPACK_IMPORTED_MODULE_0__.checkout)();
    (0,_view_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_model_js__WEBPACK_IMPORTED_MODULE_0__["default"], appEl);
  }
});
appEl.addEventListener("input", function (e) {
  if (e.target.classList.contains("update-quantity")) {
    var productId = parseInt(e.target.dataset.id, 10);
    var quantity = parseInt(e.target.value, 10);
    (0,_model_js__WEBPACK_IMPORTED_MODULE_0__.updateCartQuantity)(productId, quantity);
    (0,_view_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_model_js__WEBPACK_IMPORTED_MODULE_0__["default"], appEl);
  }
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map