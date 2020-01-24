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
/******/ 	return __webpack_require__(__webpack_require__.s = "./main/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./main/main.js":
/*!**********************!*\
  !*** ./main/main.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nasync function updatePriceOutput() {\n  try {\n    const price = await getPrice();\n    setPriceOutput(price);\n  } catch (err) {\n    console.error(err);\n    alert(\n      \"You just found a bug! Go to your browser's console for more details\"\n    );\n  }\n};\n\nfunction getPrice() {\n  const numMeals = getNumMeals();\n  const mealRate = getMealRate(numMeals);\n  return numMeals * mealRate\n};\n\nfunction getNumMeals() {\n  return getSweetNSourChickenQuantity() + getButterChickenQuantity()\n}\n\nfunction getSweetNSourChickenQuantity() {\n  const element = document.getElementById(\"sweetNSourQuantity\");\n  if (!element.checkValidity()) {\n    return 0;\n  }\n  return parseInt(element.value);\n}\n\nfunction getButterChickenQuantity() {\n  const element = document.getElementById(\"butterChickenQuantity\");\n  if (!element.checkValidity()) {\n    return 0;\n  }\n  return parseInt(element.value);\n}\n\nconst getRadioValue = name => {\n  const selector = `input[name=${name}]:checked`;\n  const element = document.querySelector(selector);\n  if (element === null) {\n    return null;\n  }\n  return element.value;\n};\n\nconst getDish = () => {\n  return getRadioValue(\"dish\");\n};\n\nconst getPickupOrDelivery = () => {\n  return getRadioValue(\"pickupOrDelivery\");\n};\n\nconst mealRates = [\n  {minMeals: 16, rate: 1000},\n  {minMeals: 11, rate: 1200},\n  {minMeals: 4, rate: 1250},\n  {minMeals: 3, rate: 1266 + (2/3)},\n  {minMeals: 2, rate: 1300},\n  {minMeals: 0, rate: 1400}\n]\n\nfunction getMealRate(numMeals) {\n  for (const {minMeals, rate} of mealRates) {\n    if (minMeals <= numMeals) {\n      return rate;\n    }\n  }\n}\n\nconst formatPrice = price => `${price} ft`;\n\nconst setPriceOutput = price => {\n  const element = document.getElementById(\"price\");\n  element.value = formatPrice(price);\n};\n\n\n//# sourceURL=webpack:///./main/main.js?");

/***/ })

/******/ });