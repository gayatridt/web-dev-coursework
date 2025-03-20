/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app-state.js":
/*!**************************!*\
  !*** ./src/app-state.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   appState: () => (/* binding */ appState)
/* harmony export */ });
var appState = {
  username: '',
  storedWord: '',
  error: '',
  currentPage: ''
};

/***/ }),

/***/ "./src/auth-controller.js":
/*!********************************!*\
  !*** ./src/auth-controller.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkUserSession: () => (/* binding */ checkUserSession),
/* harmony export */   loadUserWord: () => (/* binding */ loadUserWord),
/* harmony export */   loginUser: () => (/* binding */ loginUser),
/* harmony export */   logoutUser: () => (/* binding */ logoutUser),
/* harmony export */   updateUserWord: () => (/* binding */ updateUserWord)
/* harmony export */ });
/* harmony import */ var _services_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services.js */ "./src/services.js");
/* harmony import */ var _app_state_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-state.js */ "./src/app-state.js");
/* harmony import */ var _messages_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./messages.js */ "./src/messages.js");



function loginUser(username) {
  return (0,_services_js__WEBPACK_IMPORTED_MODULE_0__.fetchLogin)(username).then(function (_ref) {
    var username = _ref.username;
    _app_state_js__WEBPACK_IMPORTED_MODULE_1__.appState.username = username;
    _app_state_js__WEBPACK_IMPORTED_MODULE_1__.appState.currentPage = _messages_js__WEBPACK_IMPORTED_MODULE_2__.PAGES.WORD;
    _app_state_js__WEBPACK_IMPORTED_MODULE_1__.appState.error = '';
    return loadUserWord();
  })["catch"](function (error) {
    _app_state_js__WEBPACK_IMPORTED_MODULE_1__.appState.error = error.error;
    throw error;
  });
}
function checkUserSession() {
  return (0,_services_js__WEBPACK_IMPORTED_MODULE_0__.fetchSession)().then(function (_ref2) {
    var username = _ref2.username;
    _app_state_js__WEBPACK_IMPORTED_MODULE_1__.appState.username = username;
    _app_state_js__WEBPACK_IMPORTED_MODULE_1__.appState.currentPage = _messages_js__WEBPACK_IMPORTED_MODULE_2__.PAGES.WORD;
    return loadUserWord();
  })["catch"](function () {
    _app_state_js__WEBPACK_IMPORTED_MODULE_1__.appState.currentPage = _messages_js__WEBPACK_IMPORTED_MODULE_2__.PAGES.LOGIN;
  });
}
function logoutUser() {
  return (0,_services_js__WEBPACK_IMPORTED_MODULE_0__.fetchLogout)().then(function () {
    _app_state_js__WEBPACK_IMPORTED_MODULE_1__.appState.username = '';
    _app_state_js__WEBPACK_IMPORTED_MODULE_1__.appState.storedWord = '';
    _app_state_js__WEBPACK_IMPORTED_MODULE_1__.appState.error = '';
    _app_state_js__WEBPACK_IMPORTED_MODULE_1__.appState.currentPage = _messages_js__WEBPACK_IMPORTED_MODULE_2__.PAGES.LOGIN;
  })["catch"](function (error) {
    _app_state_js__WEBPACK_IMPORTED_MODULE_1__.appState.error = error.error;
    throw error;
  });
}
function loadUserWord() {
  return (0,_services_js__WEBPACK_IMPORTED_MODULE_0__.fetchWord)().then(function (_ref3) {
    var storedWord = _ref3.storedWord;
    _app_state_js__WEBPACK_IMPORTED_MODULE_1__.appState.storedWord = storedWord;
  })["catch"](function (error) {
    if (error.error === 'auth-missing') {
      _app_state_js__WEBPACK_IMPORTED_MODULE_1__.appState.currentPage = _messages_js__WEBPACK_IMPORTED_MODULE_2__.PAGES.LOGIN;
    }
    _app_state_js__WEBPACK_IMPORTED_MODULE_1__.appState.error = error.error;
    throw error;
  });
}
function updateUserWord(word) {
  return checkUserSession().then(function () {
    return (0,_services_js__WEBPACK_IMPORTED_MODULE_0__.updateWord)(word);
  }).then(function (_ref4) {
    var storedWord = _ref4.storedWord;
    _app_state_js__WEBPACK_IMPORTED_MODULE_1__.appState.storedWord = storedWord;
    _app_state_js__WEBPACK_IMPORTED_MODULE_1__.appState.error = '';
  })["catch"](function (error) {
    _app_state_js__WEBPACK_IMPORTED_MODULE_1__.appState.error = error.error;
    if (error.error === 'auth-missing') {
      _app_state_js__WEBPACK_IMPORTED_MODULE_1__.appState.currentPage = _messages_js__WEBPACK_IMPORTED_MODULE_2__.PAGES.LOGIN;
    }
    throw error;
  });
}

/***/ }),

/***/ "./src/messages.js":
/*!*************************!*\
  !*** ./src/messages.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MESSAGES: () => (/* binding */ MESSAGES),
/* harmony export */   PAGES: () => (/* binding */ PAGES)
/* harmony export */ });
var MESSAGES = {
  'auth-insufficient': "Invalid credentials. Username 'dog' is not allowed. Please try again.",
  'required-username': "Please enter a valid username (letters and numbers only).",
  'network-error': "Oops! There was a network issue. Please check your connection and try again.",
  'auth-missing': "Session expired. Please log in again.",
  "default": "Something went wrong. Please try again later."
};
var PAGES = {
  LOGIN: 'LOGIN',
  WORD: 'WORD'
};

/***/ }),

/***/ "./src/render-view.js":
/*!****************************!*\
  !*** ./src/render-view.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderView: () => (/* binding */ renderView)
/* harmony export */ });
/* harmony import */ var _messages_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./messages.js */ "./src/messages.js");
/* harmony import */ var _app_state_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-state.js */ "./src/app-state.js");


function renderErrorMessage() {
  return _app_state_js__WEBPACK_IMPORTED_MODULE_1__.appState.error ? "<p class=\"error\">".concat(_messages_js__WEBPACK_IMPORTED_MODULE_0__.MESSAGES[_app_state_js__WEBPACK_IMPORTED_MODULE_1__.appState.error] || _messages_js__WEBPACK_IMPORTED_MODULE_0__.MESSAGES["default"], "</p>") : '';
}
function renderView(appEl) {
  if (_app_state_js__WEBPACK_IMPORTED_MODULE_1__.appState.currentPage === 'LOGIN') {
    renderLoginView(appEl);
  } else if (_app_state_js__WEBPACK_IMPORTED_MODULE_1__.appState.currentPage === 'WORD') {
    renderWordView(appEl);
  }
}
function renderLoginView(appEl) {
  appEl.innerHTML = "\n    <h2>Login</h2>\n    <div class=\"form-group\">\n      <label for=\"username-input\">Username:</label>\n      <input type=\"text\" id=\"username-input\" class=\"text-input\" placeholder=\"Enter your username\" required>\n      <div class=\"button-group\">\n        <button class=\"login-btn\">Login</button>\n      </div>\n    </div>\n    ".concat(renderErrorMessage(), "\n  ");
}
function renderWordView(appEl) {
  appEl.innerHTML = "\n    <h2>Welcome, ".concat(_app_state_js__WEBPACK_IMPORTED_MODULE_1__.appState.username, "</h2>\n    <div class=\"word-display\">\n      <div class=\"word-display-line\">Your stored word: <strong>").concat(_app_state_js__WEBPACK_IMPORTED_MODULE_1__.appState.storedWord, "</strong></div>\n      <label for=\"word-input\">Enter your word here:</label>\n      <input type=\"text\" id=\"word-input\" class=\"text-input\" placeholder=\"Update your word\" value=\"").concat(_app_state_js__WEBPACK_IMPORTED_MODULE_1__.appState.storedWord, "\">\n      <button class=\"update-word-btn\">Update Word</button>\n    </div>\n    <div class=\"button-group\">\n      <button class=\"logout-btn\">Logout</button>\n    </div>\n    ").concat(renderErrorMessage(), "\n  ");
}

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchLogin: () => (/* binding */ fetchLogin),
/* harmony export */   fetchLogout: () => (/* binding */ fetchLogout),
/* harmony export */   fetchSession: () => (/* binding */ fetchSession),
/* harmony export */   fetchWord: () => (/* binding */ fetchWord),
/* harmony export */   updateWord: () => (/* binding */ updateWord)
/* harmony export */ });
function fetchLogin(username) {
  return fetch('/api/session/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      username: username
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function fetchSession() {
  return fetch('/api/session')["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function fetchLogout() {
  return fetch('/api/session', {
    method: 'DELETE'
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function fetchWord() {
  return fetch('/api/word')["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function updateWord(word) {
  return fetch('/api/word', {
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      word: word
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
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
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_state_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-state.js */ "./src/app-state.js");
/* harmony import */ var _render_view_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render-view.js */ "./src/render-view.js");
/* harmony import */ var _auth_controller_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth-controller.js */ "./src/auth-controller.js");



var appEl = document.querySelector('#app');
(0,_auth_controller_js__WEBPACK_IMPORTED_MODULE_2__.checkUserSession)().then(function () {
  (0,_render_view_js__WEBPACK_IMPORTED_MODULE_1__.renderView)(appEl);
});
appEl.addEventListener('click', function (e) {
  if (e.target.classList.contains('login-btn')) {
    var username = document.querySelector('#username-input').value.trim();
    (0,_auth_controller_js__WEBPACK_IMPORTED_MODULE_2__.loginUser)(username).then(function () {
      return (0,_render_view_js__WEBPACK_IMPORTED_MODULE_1__.renderView)(appEl);
    })["catch"](function () {
      return (0,_render_view_js__WEBPACK_IMPORTED_MODULE_1__.renderView)(appEl);
    });
  }
  if (e.target.classList.contains('logout-btn')) {
    (0,_auth_controller_js__WEBPACK_IMPORTED_MODULE_2__.logoutUser)().then(function () {
      return (0,_render_view_js__WEBPACK_IMPORTED_MODULE_1__.renderView)(appEl);
    })["catch"](function () {
      return (0,_render_view_js__WEBPACK_IMPORTED_MODULE_1__.renderView)(appEl);
    });
  }
  if (e.target.classList.contains('update-word-btn')) {
    var newWord = document.querySelector('#word-input').value.trim();
    (0,_auth_controller_js__WEBPACK_IMPORTED_MODULE_2__.updateUserWord)(newWord).then(function () {
      return (0,_render_view_js__WEBPACK_IMPORTED_MODULE_1__.renderView)(appEl);
    })["catch"](function () {
      return (0,_render_view_js__WEBPACK_IMPORTED_MODULE_1__.renderView)(appEl);
    });
  }
});
appEl.addEventListener('input', function (e) {
  if (e.target.classList.contains('word-input')) {
    _app_state_js__WEBPACK_IMPORTED_MODULE_0__.appState.storedWord = e.target.value;
  }
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map