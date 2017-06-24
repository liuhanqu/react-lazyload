function throttle(fn, wait) {
  let timer = null;
  let previous = 0;
  return function(...args) {
    const now = +new Date();
    if (!previous) {
      previous = now;
    }
    const remain = (previous + wait) - now;

    if (remain < 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      previous = now;
      fn.call(this, ...args);
    } else if (!timer) {
      timer = setTimeout(function() {
        timer = null;
        previous = now;
        fn.call(this, ...args);
      }, wait)
    }
  }
}

export default throttle;
