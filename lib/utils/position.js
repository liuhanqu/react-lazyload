'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _getScroller = require('./getScroller');

var _getScroller2 = _interopRequireDefault(_getScroller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var abovethetop = function abovethetop(nodeRect, containerRect, threshhold) {
  return nodeRect.bottom + threshhold < containerRect.top;
};

var belowthefold = function belowthefold(nodeRect, containerRect, threshhold) {
  return nodeRect.top > containerRect.height + containerRect.top + threshhold;
};

var rightofffold = function rightofffold(nodeRect, containerRect, threshhold) {
  return nodeRect.left > containerRect.left + containerRect.width + threshhold;
};

var leftofbegin = function leftofbegin(nodeRect, containerRect, threshhold) {
  return nodeRect.right + threshhold < containerRect.left;
};

var isInviewport = function isInviewport(component) {
  var node = _reactDom2.default.findDOMNode(component); // eslint-disable-line
  var threshhold = component.props.threshhold;
  var scrollerIsWindow = component.props.scrollerIsWindow;

  var container = window;
  if (!scrollerIsWindow) {
    container = (0, _getScroller2.default)(node);
  }

  var containerRect = void 0;
  try {
    containerRect = container.getBoundingClientRect();
  } catch (e) {
    var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    containerRect = { top: 0, left: 0, right: width, bottom: height, height: height, width: width };
  }
  var nodeRect = node.getBoundingClientRect();

  return !abovethetop(nodeRect, containerRect, threshhold) && !belowthefold(nodeRect, containerRect, threshhold) && !leftofbegin(nodeRect, containerRect, threshhold) && !rightofffold(nodeRect, containerRect, threshhold);
};

exports.default = isInviewport;
