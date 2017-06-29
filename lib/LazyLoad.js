'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _throttle = require('./utils/throttle');

var _throttle2 = _interopRequireDefault(_throttle);

var _getScroller = require('./utils/getScroller');

var _getScroller2 = _interopRequireDefault(_getScroller);

var _position = require('./utils/position');

var _position2 = _interopRequireDefault(_position);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// 绑定scroll事件的元素
var scrollers = [];

// key为scroller在scrollers中的index
// value为监听scroller滚动的Lazy Load Component
// {
//   0: [],
//   1: [],
// }
var listeners = {};

// key为scroller在scrollers中的index
// value为scroller滚动对应的eventHandler
// {
//   0: fn,
// }
var handlers = {};

var lazyloadHandler = function lazyloadHandler(event) {
  var idx = scrollers.findIndex(function (scroller) {
    return event.target === scroller;
  });

  if (idx === -1) {
    return;
  }

  var components = listeners[idx];

  components.forEach(function (component) {
    checkIsInViewport(component);
  });
};

var checkIsInViewport = function checkIsInViewport(component) {
  var visible = (0, _position2.default)(component);
  if (!visible) {
    return;
  }
  component.setState({
    visible: visible
  });
};

var LazyLoad = function (_Component) {
  _inherits(LazyLoad, _Component);

  function LazyLoad(props) {
    _classCallCheck(this, LazyLoad);

    var _this = _possibleConstructorReturn(this, (LazyLoad.__proto__ || Object.getPrototypeOf(LazyLoad)).call(this, props));

    _this.state = {
      visible: false
    };
    return _this;
  }

  _createClass(LazyLoad, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var scroller = null;
      var idx = -1;

      if (this.props.scrollerIsWindow) {
        scroller = document;
      } else {
        var node = _reactDom2.default.findDOMNode(this); // eslint-disable-line
        scroller = (0, _getScroller2.default)(node);
      }

      idx = scrollers.findIndex(function (val) {
        return scroller === val;
      });

      if (idx === -1 || listeners[idx].length === 0) {
        if (idx === -1) {
          idx = scrollers.push(scroller) - 1;
          listeners[idx] = [];
        }

        var finalLazyloadHanlder = (0, _throttle2.default)(lazyloadHandler, 100);

        handlers[idx] = finalLazyloadHanlder;

        scroller.addEventListener('scroll', finalLazyloadHanlder);
      }

      this.idx = idx;
      this.scroller = scroller;

      listeners[idx].push(this);

      checkIsInViewport(this);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return nextState.visible;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _this2 = this;

      if (this.state.visible && !prevState.visible) {
        var cmps = listeners[this.idx];

        cmps = cmps.filter(function (cmp) {
          return cmp !== _this2;
        });
        listeners[this.idx] = cmps;
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _this3 = this;

      var cmps = listeners[this.idx];

      if (!cmps || cmps.length === 0) {
        return;
      }

      cmps = cmps.filter(function (cmp) {
        return cmp !== _this3;
      });

      listeners[this.idx] = cmps;

      if (cmps.length === 0) {
        this.scroller.removeEventListener('scroll', handlers[this.idx]);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return this.state.visible ? this.props.children : this.props.placeholder ? this.props.placeholder : _react2.default.createElement('div', { className: 'lazy-load-placeholder ' + this.props.cls });
    }
  }]);

  return LazyLoad;
}(_react.Component);

LazyLoad.propTypes = {
  children: _propTypes2.default.node,
  cls: _propTypes2.default.string,
  scrollerIsWindow: _propTypes2.default.bool,
  placeholder: _propTypes2.default.element, // eslint-disable-line
  threshhold: _propTypes2.default.number // eslint-disable-line
};
LazyLoad.defaultProps = {
  cls: '',
  threshhold: 0,
  scrollerIsWindow: false
};
exports.default = LazyLoad;
