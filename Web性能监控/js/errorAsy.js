try {
  //可以监听图片等资源错误
  // window.addEventListener('error', function (e) {
  //   console.log('error捕获:', e)
  //   return true;
  // },true)

  window.onerror = function () {
    console.log('error全局捕获：',arguments);
  }
  window.addEventListener('unhandledrejection',function(e){
    //处理未处理的拒绝...
    //防止默认处理(例如将错误输出到控制台)
    console.log('unhandledrejection:',e);
    e.preventDefault();
  },false)

  // 当一个Promise错误最初未被处理，但是稍后又得到了处理，则会触发rejectionhandled事件：
  window.addEventListener('rejectionhandled',function (e) {
     //处理未处理的拒绝...
    //防止默认处理(例如将错误输出到控制台)
    console.log('rejectionhandled:',e);
    e.preventDefault();
  },false)
} catch (error) {
  console.log('异常监控代码出错：', error)
}
