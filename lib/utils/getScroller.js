"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getScroller = function getScroller(node) {
  if (!node) {
    return document;
  }

  var scrollReg = /auto|scroll/;
  var parent = node.parentNode;

  while (parent) {
    if (parent.nodeType === Node.ELEMENT_NODE) {
      var style = window.getComputedStyle(parent);
      var overflow = style.overflow;

      // overflow-x, overflow-y中有一个的值为'auto'时，overflow的值就为'auto'
      if (scrollReg.test(overflow)) {
        return parent;
      }
    }

    parent = parent.parentNode;
  }

  return node.ownerDocument;
};

exports.default = getScroller;
