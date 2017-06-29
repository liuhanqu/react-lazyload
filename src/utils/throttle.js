function throttle(fn, wait) {
  let timer = null;
  return function (...args) {
    if (timer) {
      return;
    }
    timer = setTimeout(function () {
      timer = null;
      fn.apply(this, args);
    }, wait);
  };
}

export default throttle;
