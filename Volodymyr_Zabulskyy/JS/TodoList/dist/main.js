/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/Calendar.js":
/*!****************************!*\
  !*** ./src/js/Calendar.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, exports) {

eval("throw new Error(\"Module parse failed: Unexpected token (110:0)\\nYou may need an appropriate loader to handle this file type.\\n|     month = (month === undefined) ? d.getMonth() : (month === 0) ? 12 : month;\\n|     let monthTable =\\n> }\\n| \\n| export default Calendar\");\n\n//# sourceURL=webpack:///./src/js/Calendar.js?");

/***/ }),

/***/ "./src/js/TodoItem.js":
/*!****************************!*\
  !*** ./src/js/TodoItem.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _TodoList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TodoList */ \"./src/js/TodoList.js\");\n\n\nclass TodoItem {\n    constructor(text, parent) {\n        this.text = text;\n        this.parent = parent;\n        this.done = false;\n        this.htmlElem = this.render();\n    }\n\n    remove() {\n        this.parent.removeTodo(this);\n    }\n\n    toggleDone() {\n        this.done = !this.done;\n        this.htmlElem.style.textDecoration = this.done ? \"line-through\" : \"\";\n        this.checkBoxHtml.checked = this.done;\n    }\n\n    addRemoveBtn() {\n        let removeBtn = document.createElement('button');\n        removeBtn.innerText = 'x';\n        removeBtn.setAttribute('class', 'task__delete-button');\n        removeBtn.onclick = () => {\n            this.remove()\n        };\n        this.xmarkHtml = removeBtn;\n        return removeBtn;\n    }\n\n    addCheckBox() {\n        let checkBtn = document.createElement('input');\n        checkBtn.setAttribute('type', 'checkbox');\n        // checkBtn.addEventListener('click', () => {this.toggleDone()});\n        checkBtn.checked = this.done;\n        this.checkBoxHtml = checkBtn;\n        return checkBtn;\n    }\n\n    addText(text) {\n        let textElem = document.createElement('span');\n        textElem.innerText = text;\n        textElem.setAttribute('class', 'task__text');\n        this.textHtml = textElem;\n        return textElem;\n    }\n\n    render() {\n        let elem = document.createElement('li');\n        elem.setAttribute('class', 'task');\n        elem.appendChild(this.addCheckBox());\n        elem.appendChild(this.addText(this.text));\n        elem.appendChild(this.addRemoveBtn());\n        elem.addEventListener('click', () => {this.toggleDone()});\n        elem.style.textDecoration = this.done ? \"line-through\" : \"\";\n        return elem;\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (TodoItem);\n\n//# sourceURL=webpack:///./src/js/TodoItem.js?");

/***/ }),

/***/ "./src/js/TodoList.js":
/*!****************************!*\
  !*** ./src/js/TodoList.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _TodoItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TodoItem */ \"./src/js/TodoItem.js\");\n\n\nclass TodoList {\n    constructor(container, form, input) {\n        this.form = form;\n        this.inputForm = input;\n        this.form.addEventListener('submit', (e) => {\n            e.preventDefault();\n            const text = this.inputForm.value;\n            if (!/\\S/.test(text)) return;\n            this.addTodo(text);\n            this.inputForm.value = \"\";\n        });\n        this.container = container;\n        this.todoItems = [];\n        this.htmlElem = document.createElement('ul');\n        this.htmlElem.setAttribute('class', 'tasks-container');\n        this.container.appendChild(this.htmlElem);\n        this.currentFilter = 'all';\n        this.filters = {\n            'all': (elem) => true,\n            'done': (elem) => elem.done,\n            'active': (elem) => !elem.done\n        };\n        this.removeFilters = {\n            'done': (elem) => elem.done\n        };\n        this.render();\n    }\n\n    render() {\n        let content = document.createElement('ul');\n        content.setAttribute('class', 'tasks-container');\n        for (let elem in this.todoItems) {\n            if (this.filters[this.currentFilter](this.todoItems[elem])) {\n                content.appendChild(this.todoItems[elem].htmlElem);\n            }\n        }\n        this.container.removeChild(this.htmlElem);\n        this.htmlElem = content;\n        this.container.appendChild(this.htmlElem);\n    }\n\n\n    addBtnFilter(btn, filterName, filter) {\n        if (filter !== undefined) {\n            this.filters[filterName] = filter;\n        }\n        btn.onclick = () => {\n            this.currentFilter = filterName;\n            this.render();\n        };\n    }\n\n    removeByFilter(filter) {\n        let toRemove = [];\n        for (let elem in this.todoItems) {\n            if (filter(this.todoItems[elem])) {\n                toRemove.push(this.todoItems[elem])\n            }\n        }\n\n        for (let elem in toRemove) {\n            this.removeTodo(toRemove[elem])\n        }\n        this.render();\n    }\n\n    addBtnRemoveByFilter(btn, filterName, filter) {\n        if (filter !== undefined) {\n            this.removeFilters[filterName] = filter;\n        }\n        btn.onclick = () => {\n            this.removeByFilter(this.removeFilters[filterName])\n        };\n    }\n\n\n    addTodo(text) {\n        let newItem = new _TodoItem__WEBPACK_IMPORTED_MODULE_0__[\"default\"](text, this);\n        this.todoItems.unshift(newItem);\n        this.htmlElem.insertBefore(newItem.htmlElem, this.htmlElem.firstChild);\n    };\n\n    removeTodo(item) {\n        this.todoItems.splice(this.todoItems.indexOf(item), 1);\n        this.htmlElem.removeChild(item.htmlElem);\n    };\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (TodoList);\n\n//# sourceURL=webpack:///./src/js/TodoList.js?");

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _TodoList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TodoList */ \"./src/js/TodoList.js\");\n/* harmony import */ var _TodoItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TodoItem */ \"./src/js/TodoItem.js\");\n/* harmony import */ var _Calendar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Calendar */ \"./src/js/Calendar.js\");\n\n\n\n\nconst form = document.getElementById(\"newTaskForm\");\nconst input = document.getElementById(\"newTaskInput\");\n\nlet todoList = new _TodoList__WEBPACK_IMPORTED_MODULE_0__[\"default\"](document.getElementById('content'), form, input);\ntodoList.addBtnFilter(document.getElementById('filter-all'), 'all');\ntodoList.addBtnFilter(document.getElementById('filter-done'), 'done');\ntodoList.addBtnFilter(document.getElementById('filter-active'), 'active');\ntodoList.addBtnRemoveByFilter(document.getElementById('clear-done'), 'done');\n\nconst calendar = new _Calendar__WEBPACK_IMPORTED_MODULE_2__[\"default\"](document.getElementById('calendarPlaceholder'));\n\n\n//# sourceURL=webpack:///./src/js/main.js?");

/***/ }),

/***/ "./src/styles/main.scss":
/*!******************************!*\
  !*** ./src/styles/main.scss ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack:///./src/styles/main.scss?");

/***/ }),

/***/ 0:
/*!*****************************************************!*\
  !*** multi ./src/js/main.js ./src/styles/main.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./src/js/main.js */\"./src/js/main.js\");\nmodule.exports = __webpack_require__(/*! ./src/styles/main.scss */\"./src/styles/main.scss\");\n\n\n//# sourceURL=webpack:///multi_./src/js/main.js_./src/styles/main.scss?");

/***/ })

/******/ });