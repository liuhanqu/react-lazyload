import ReactDOM from 'react-dom';
import getScroller from './getScroller';

const abovethetop = (nodeRect, containerRect, threshhold) =>
  nodeRect.bottom + threshhold < containerRect.top;

const belowthefold = (nodeRect, containerRect, threshhold) =>
  nodeRect.top > containerRect.height + containerRect.top + threshhold;

const rightofffold = (nodeRect, containerRect, threshhold) =>
  nodeRect.left > containerRect.left + containerRect.width + threshhold;

const leftofbegin = (nodeRect, containerRect, threshhold) =>
  nodeRect.right + threshhold < containerRect.left;


const isInviewport = (component) => {
  const node = ReactDOM.findDOMNode(component); // eslint-disable-line
  const threshhold = component.props.threshhold;
  const scrollerIsWindow = component.props.scrollerIsWindow;

  let container = window;
  if (!scrollerIsWindow) {
    container = getScroller(node);
  }

  let containerRect;
  try {
    containerRect = container.getBoundingClientRect();
  } catch (e) {
    const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    containerRect = { top: 0, left: 0, right: width, bottom: height, height, width };
  }
  const nodeRect = node.getBoundingClientRect();

  return !abovethetop(nodeRect, containerRect, threshhold) && !belowthefold(nodeRect, containerRect, threshhold) &&
          !leftofbegin(nodeRect, containerRect, threshhold) && !rightofffold(nodeRect, containerRect, threshhold);
};

export default isInviewport;
