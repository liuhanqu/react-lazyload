"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function throttle(fn, wait) {
  var timer = null;
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (timer) {
      return;
    }
    timer = setTimeout(function () {
      timer = null;
      fn.apply(this, args);
    }, wait);
  };
}

exports.default = throttle;
