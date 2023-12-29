let buttonVisible = true;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // 接收到请求获取按钮状态的消息
  if (request.action === 'getButtonStatus') {
    // 响应消息并发送当前按钮状态
    sendResponse({ buttonVisible });
  }
  // 如果接收到请求切换按钮状态的消息
  else if (request.action === 'toggleButtonStatus') {
    buttonVisible = !buttonVisible;

    // 响应消息并发送更新后的按钮状态
    sendResponse({ buttonVisible });
  }
});
