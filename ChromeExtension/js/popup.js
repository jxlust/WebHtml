// 这里的js其实是操作popup.html产生的dom的
const toggle = document.getElementById('toggle');
document.addEventListener('DOMContentLoaded', function () {
    // 获取开关按钮的初始值。这里{ type: 'get_editable' }是可以随意定义的，可以传递任何你想传递的信息
    // console.log('dom loaded.');
    sendMessageToContentScript({ type: 'get_editable' }, (response) => {
      toggle.checked = ['true', true].includes(response) ? 'checked' : null;
    });
  
    // 切换contentEditable状态
    toggle.addEventListener('change', () => {
      sendMessageToContentScript({ type: 'toggle' });
    });
  });
  
  // 向content_scripts发送消息的函数
  function sendMessageToContentScript(message, callback) {
    // 这里用到了tabs，所以前面配置文件需要配置"permissions": ["tabs"]
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, message, (response) => {
        if (callback) callback(response);
      });
    });
  }