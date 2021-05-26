try {
  window.addEventListener('error', function (e) {
    console.log('捕获报错：', e)
  })
} catch (error) {
  console.log('获取错误报错了：', error)
}
