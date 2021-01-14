let count = 0;
self.addEventListener('message', function (e) {
  console.log('worker内部消息监听：', e)
  count = e.data
  //主线程过来的消息
}, false);
setInterval(() => {
  self.postMessage(count++);
}, 1000);