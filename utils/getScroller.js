import ReactDOM from 'react-dom';

const getScroller = (node) => {
  if (!node) {
    return document.documentElement;
  }

  const scrollReg = /auto|scroll/;
  let parent = node.parentNode;

  while (parent) {
    const style =  window.getComputedStyle(parent);
    const overflow = style.overflow;

    // overflow-x, overflow-y中有一个的值为'auto'时，overflow的值就为'auto'
    if (scrollReg.test(overflow)) {
      return parent;
    }

    parent = parent.parentNode;
  }

  return document.documentElement;
};

export default getScroller;
