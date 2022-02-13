module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../ssr-module-cache.js');
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./pages/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./config.js":
/*!*******************!*\
  !*** ./config.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\n  PAGE_TITLE: \"Duel Dao\",\n  COMPANY_NAME: \"Duel Dao\",\n  DISPLAY_COMPANY_NAME: \"Duel Dao\",\n  COMPANY_URL: \"https://dueldao.xyz\",\n  COMPANY_LOGO_URL: \"/favicon.png\",\n  TAGLINE: \"DAO vs DAO gaming on-chain\",\n  SUPPORT_EMAIL: \"nikita.jerschow@gmail.com\",\n  TWITTER_URL: 'https://twitter.com/nikita_jerschow',\n  META: {\n    TITLE: \"DAO vs DAO gaming on-chain\",\n    DESCRIPTION: \"\",\n    IMAGE: \"\"\n  },\n  PALETTE: {\n    BACKGROUND_PRIMARY: \"#101629\",\n    BACKGROUND_SECONDARY: \"#FFFFFF\",\n    TEXT_PRIMARY: \"#FFFFFF\",\n    TEXT_SECONDARY: \"#FFFFFFAA\",\n    COLOR_PRIMARY: \"#0089FF\",\n    COLOR_SECONDARY: \"#00AAFF\",\n    BORDER_COLOR: \"#212838\"\n  }\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jb25maWcuanM/YTFiYyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwiUEFHRV9USVRMRSIsIkNPTVBBTllfTkFNRSIsIkRJU1BMQVlfQ09NUEFOWV9OQU1FIiwiQ09NUEFOWV9VUkwiLCJDT01QQU5ZX0xPR09fVVJMIiwiVEFHTElORSIsIlNVUFBPUlRfRU1BSUwiLCJUV0lUVEVSX1VSTCIsIk1FVEEiLCJUSVRMRSIsIkRFU0NSSVBUSU9OIiwiSU1BR0UiLCJQQUxFVFRFIiwiQkFDS0dST1VORF9QUklNQVJZIiwiQkFDS0dST1VORF9TRUNPTkRBUlkiLCJURVhUX1BSSU1BUlkiLCJURVhUX1NFQ09OREFSWSIsIkNPTE9SX1BSSU1BUlkiLCJDT0xPUl9TRUNPTkRBUlkiLCJCT1JERVJfQ09MT1IiXSwibWFwcGluZ3MiOiJBQUFBQSxNQUFNLENBQUNDLE9BQVAsR0FBaUI7QUFDYkMsWUFBVSxFQUFFLFVBREM7QUFFYkMsY0FBWSxFQUFFLFVBRkQ7QUFHYkMsc0JBQW9CLEVBQUUsVUFIVDtBQUliQyxhQUFXLEVBQUUscUJBSkE7QUFLYkMsa0JBQWdCLEVBQUUsY0FMTDtBQU1iQyxTQUFPLEVBQUUsNEJBTkk7QUFPYkMsZUFBYSxFQUFFLDJCQVBGO0FBUWJDLGFBQVcsRUFBRSxxQ0FSQTtBQVNiQyxNQUFJLEVBQUU7QUFDRkMsU0FBSyxFQUFFLDRCQURMO0FBRUZDLGVBQVcsRUFBRSxFQUZYO0FBR0ZDLFNBQUssRUFBRTtBQUhMLEdBVE87QUFjYkMsU0FBTyxFQUFFO0FBQ0xDLHNCQUFrQixFQUFFLFNBRGY7QUFFTEMsd0JBQW9CLEVBQUUsU0FGakI7QUFHTEMsZ0JBQVksRUFBRSxTQUhUO0FBSUxDLGtCQUFjLEVBQUUsV0FKWDtBQUtMQyxpQkFBYSxFQUFFLFNBTFY7QUFNTEMsbUJBQWUsRUFBRSxTQU5aO0FBT0xDLGdCQUFZLEVBQUU7QUFQVDtBQWRJLENBQWpCIiwiZmlsZSI6Ii4vY29uZmlnLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgUEFHRV9USVRMRTogXCJEdWVsIERhb1wiLFxuICAgIENPTVBBTllfTkFNRTogXCJEdWVsIERhb1wiLFxuICAgIERJU1BMQVlfQ09NUEFOWV9OQU1FOiBcIkR1ZWwgRGFvXCIsXG4gICAgQ09NUEFOWV9VUkw6IFwiaHR0cHM6Ly9kdWVsZGFvLnh5elwiLFxuICAgIENPTVBBTllfTE9HT19VUkw6IFwiL2Zhdmljb24ucG5nXCIsXG4gICAgVEFHTElORTogXCJEQU8gdnMgREFPIGdhbWluZyBvbi1jaGFpblwiLFxuICAgIFNVUFBPUlRfRU1BSUw6IFwibmlraXRhLmplcnNjaG93QGdtYWlsLmNvbVwiLFxuICAgIFRXSVRURVJfVVJMOiAnaHR0cHM6Ly90d2l0dGVyLmNvbS9uaWtpdGFfamVyc2Nob3cnLFxuICAgIE1FVEE6IHtcbiAgICAgICAgVElUTEU6IFwiREFPIHZzIERBTyBnYW1pbmcgb24tY2hhaW5cIixcbiAgICAgICAgREVTQ1JJUFRJT046IFwiXCIsXG4gICAgICAgIElNQUdFOiBcIlwiXG4gICAgfSxcbiAgICBQQUxFVFRFOiB7XG4gICAgICAgIEJBQ0tHUk9VTkRfUFJJTUFSWTogXCIjMTAxNjI5XCIsXG4gICAgICAgIEJBQ0tHUk9VTkRfU0VDT05EQVJZOiBcIiNGRkZGRkZcIixcbiAgICAgICAgVEVYVF9QUklNQVJZOiBcIiNGRkZGRkZcIixcbiAgICAgICAgVEVYVF9TRUNPTkRBUlk6IFwiI0ZGRkZGRkFBXCIsXG4gICAgICAgIENPTE9SX1BSSU1BUlk6IFwiIzAwODlGRlwiLFxuICAgICAgICBDT0xPUl9TRUNPTkRBUlk6IFwiIzAwQUFGRlwiLFxuICAgICAgICBCT1JERVJfQ09MT1I6IFwiIzIxMjgzOFwiXG4gICAgfVxufSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./config.js\n");

/***/ }),

/***/ "./pages/app.js":
/*!**********************!*\
  !*** ./pages/app.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _material_ui_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/styles */ \"@material-ui/styles\");\n/* harmony import */ var _material_ui_styles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_styles__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core */ \"@material-ui/core\");\n/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../config */ \"./config.js\");\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_config__WEBPACK_IMPORTED_MODULE_5__);\n\nvar _jsxFileName = \"/Users/nikitajerschow/Documents/PassiveIncome/CryptoBase/EthDenver/DuelDao/apps/web/pages/app.js\";\n\n\n\n\n\nconst useStyles = Object(_material_ui_styles__WEBPACK_IMPORTED_MODULE_2__[\"makeStyles\"])({\n  root: {\n    background: _config__WEBPACK_IMPORTED_MODULE_5___default.a.PALETTE.BACKGROUND_PRIMARY,\n    display: 'flex',\n    flexDirection: 'column',\n    minHeight: '100vh'\n  }\n});\n\nconst Dashboard = props => {\n  const classes = useStyles();\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n    className: classes.root,\n    children: \"This is app.js\"\n  }, void 0, false, {\n    fileName: _jsxFileName,\n    lineNumber: 21,\n    columnNumber: 12\n  }, undefined);\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Dashboard);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9hcHAuanM/MDU4ZiJdLCJuYW1lcyI6WyJ1c2VTdHlsZXMiLCJtYWtlU3R5bGVzIiwicm9vdCIsImJhY2tncm91bmQiLCJjb25maWciLCJQQUxFVFRFIiwiQkFDS0dST1VORF9QUklNQVJZIiwiZGlzcGxheSIsImZsZXhEaXJlY3Rpb24iLCJtaW5IZWlnaHQiLCJEYXNoYm9hcmQiLCJwcm9wcyIsImNsYXNzZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFFQSxNQUFNQSxTQUFTLEdBQUlDLHNFQUFVLENBQUM7QUFDMUJDLE1BQUksRUFBRTtBQUNGQyxjQUFVLEVBQUVDLDhDQUFNLENBQUNDLE9BQVAsQ0FBZUMsa0JBRHpCO0FBRUZDLFdBQU8sRUFBRSxNQUZQO0FBR0ZDLGlCQUFhLEVBQUUsUUFIYjtBQUlGQyxhQUFTLEVBQUU7QUFKVDtBQURvQixDQUFELENBQTdCOztBQVNBLE1BQU1DLFNBQVMsR0FBSUMsS0FBRCxJQUFXO0FBQ3pCLFFBQU1DLE9BQU8sR0FBR1osU0FBUyxFQUF6QjtBQUVBLHNCQUFPO0FBQUssYUFBUyxFQUFFWSxPQUFPLENBQUNWLElBQXhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQVA7QUFHSCxDQU5EOztBQVFlUSx3RUFBZiIsImZpbGUiOiIuL3BhZ2VzL2FwcC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge1xuICAgIG1ha2VTdHlsZXNcbn0gZnJvbSAnQG1hdGVyaWFsLXVpL3N0eWxlcyc7XG5pbXBvcnQgeyBHcmlkLCBUeXBvZ3JhcGh5IH0gZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUnO1xuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnJztcblxuY29uc3QgdXNlU3R5bGVzID0gIG1ha2VTdHlsZXMoe1xuICAgIHJvb3Q6IHtcbiAgICAgICAgYmFja2dyb3VuZDogY29uZmlnLlBBTEVUVEUuQkFDS0dST1VORF9QUklNQVJZLFxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxuICAgICAgICBtaW5IZWlnaHQ6ICcxMDB2aCdcbiAgICB9XG59KVxuXG5jb25zdCBEYXNoYm9hcmQgPSAocHJvcHMpID0+IHtcbiAgICBjb25zdCBjbGFzc2VzID0gdXNlU3R5bGVzKCk7XG5cbiAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9e2NsYXNzZXMucm9vdH0+XG4gICAgICAgIFRoaXMgaXMgYXBwLmpzXG4gICAgPC9kaXY+XG59XG5cbmV4cG9ydCBkZWZhdWx0IERhc2hib2FyZCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/app.js\n");

/***/ }),

/***/ "@material-ui/core":
/*!************************************!*\
  !*** external "@material-ui/core" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@material-ui/core\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbWF0ZXJpYWwtdWkvY29yZVwiP2I2OTkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiQG1hdGVyaWFsLXVpL2NvcmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbWF0ZXJpYWwtdWkvY29yZVwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///@material-ui/core\n");

/***/ }),

/***/ "@material-ui/styles":
/*!**************************************!*\
  !*** external "@material-ui/styles" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@material-ui/styles\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbWF0ZXJpYWwtdWkvc3R5bGVzXCI/ZmQ4ZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJAbWF0ZXJpYWwtdWkvc3R5bGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG1hdGVyaWFsLXVpL3N0eWxlc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///@material-ui/styles\n");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"axios\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJheGlvc1wiPzcwYzYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiYXhpb3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJheGlvc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///axios\n");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdFwiPzU4OGUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoicmVhY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///react\n");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react/jsx-dev-runtime\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC9qc3gtZGV2LXJ1bnRpbWVcIj9jZDkwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6InJlYWN0L2pzeC1kZXYtcnVudGltZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0L2pzeC1kZXYtcnVudGltZVwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///react/jsx-dev-runtime\n");

/***/ })

/******/ });