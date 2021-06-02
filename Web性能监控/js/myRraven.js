//包装异步操作，用于捕获错误
function _myErrorCatch(e) {
  console.log("处理监听到的错误：", e);
}
// function wrapFunction(fn) {
//   return function () {
//     try {
//         // fn.call(this,...arguments)
//         fn.apply(this,arguments)
//     } catch (error) {
//       console.log("异步操作抛出错误：", error);
//       _myErrorCatch(error)
//     }
//   };
// }
// const _setTimeout = globalThis.setTimeout;
// function setTimeout(fn, timeout) {
//   _setTimeout(wrapFunction(fn), timeout);
// }

const _setTimeout = globalThis.setTimeout;
function setTimeout(fn, timeout) {
  const wrapFunc = function () {
      try {
        fn.apply(this,arguments)
      } catch (error) {
          throw error;
      }
  };
  _setTimeout(wrapFunc, timeout);
}

setTimeout(() => {
  a = a + 1;
}, 1000);

// 包装addEventLIstener
const originAddEventListener = EventTarget.prototype.addEventListener;
EventTarget.prototype.addEventListener = function (type, listener, options) {
  const wrapFunction = function (...args) {
    try {
      listener.apply(this, args);
    } catch (error) {
      throw error;
    }
  };
  originAddEventListener.call(this, type, wrapFunction, options);
};
