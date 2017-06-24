import ReactDOM from 'react-dom';

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
    container = getScrollParent(node);
  }

  let containerRect;
  try {
    containerRect = container.getBoundingClientRect();
  } catch (e) {
    containerRect = { top: 0, right: window.innerWidth, bottom: window.innerHeight, left: 0, height: window.innerHeight, width: window.innerWidth };
  }
  const nodeRect = node.getBoundingClientRect();

  return !abovethetop(nodeRect, containerRect, threshhold) && !belowthefold(nodeRect, containerRect, threshhold) &&
          !leftofbegin(nodeRect, containerRect, threshhold) && !rightofffold(nodeRect, containerRect, threshhold);
};

export default isInviewport;
