import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import throttle from './utils/throttle';
import getScroller from './utils/getScroller';
import isInviewport from './utils/position';

// 绑定scroll事件的元素
const scrollers = [];

// key为scroller在scrollers中的index
// value为监听scroller滚动的Lazy Load Component
// {
//   0: [],
//   1: [],
// }
const listeners = {};

// key为scroller在scrollers中的index
// value为scroller滚动对应的eventHandler
// {
//   0: fn,
// }
const handlers = {};


const lazyloadHandler = function (event) {
  const idx = scrollers.findIndex(scroller => event.target === scroller);

  if (idx === -1) {
    return;
  }

  const components = listeners[idx];

  components.forEach((component) => {
    checkIsInViewport(component);
  });
};

const checkIsInViewport = function (component) {
  const visible = isInviewport(component);
  if (!visible) {
    return;
  }
  component.setState({
    visible,
  });
};


class LazyLoad extends Component {
  static propTypes = {
    children: PropTypes.node,
    cls: PropTypes.string,
    scrollerIsWindow: PropTypes.bool,
    placeholder: PropTypes.element, // eslint-disable-line
    threshhold: PropTypes.number, // eslint-disable-line
  };

  static defaultProps = {
    cls: '',
    threshhold: 0,
    scrollerIsWindow: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };
  }

  componentDidMount() {
    let scroller = null;
    let idx = -1;

    if (this.props.scrollerIsWindow) {
      scroller = document;
    } else {
      const node = ReactDOM.findDOMNode(this); // eslint-disable-line
      scroller = getScroller(node);
    }

    idx = scrollers.findIndex(val => scroller === val);

    if (idx === -1 || listeners[idx].length === 0) {
      if (idx === -1) {
        idx = scrollers.push(scroller) - 1;
        listeners[idx] = [];
      }

      const finalLazyloadHanlder = throttle(lazyloadHandler, 100);

      handlers[idx] = finalLazyloadHanlder;

      scroller.addEventListener('scroll', finalLazyloadHanlder);
    }

    this.idx = idx;
    this.scroller = scroller;

    listeners[idx].push(this);

    checkIsInViewport(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.visible;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.visible && !prevState.visible) {
      let cmps = listeners[this.idx];

      cmps = cmps.filter(cmp => cmp !== this);
      listeners[this.idx] = cmps;
    }
  }

  componentWillUnmount() {
    let cmps = listeners[this.idx];

    if (!cmps || cmps.length === 0) {
      return;
    }

    cmps = cmps.filter(cmp => cmp !== this);

    listeners[this.idx] = cmps;

    if (cmps.length === 0) {
      this.scroller.removeEventListener('scroll', handlers[this.idx]);
    }
  }

  render() {
    return this.state.visible ?
      this.props.children :
      this.props.placeholder ?
        this.props.placeholder :
        <div className={`lazy-load-placeholder ${this.props.cls}`} style={{height: '100px'}} />;
  }
}

export default LazyLoad;
