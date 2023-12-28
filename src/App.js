import React, { useState, useEffect } from 'react';

function App() {
  const [buttonText, setButtonText] = useState('open'); 
  const [buttonVisible, setButtonVisible] = useState(true);

// 发送消息给 background script 请求按钮状态更新
const sendMessageToBackground = (action) => {
  chrome.runtime.sendMessage({ action }, (response) => {
    // 更新 React 组件中的按钮显示状态
    setButtonVisible(response.buttonVisible);
    // 根据返回的按钮状态设置按钮文字
    setButtonText(response.buttonVisible ? 'close' : 'open');

    // 向 content script 发送消息，通知其更新按钮显示状态
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { message: response.buttonVisible });
    });
  });
};

  const toggleButtonStatus = () => {
    sendMessageToBackground('toggleButtonStatus');
  };

  useEffect(() => {
    // 获取初始按钮状态
    sendMessageToBackground('getButtonStatus');
  }, []);

  return (
    <div className="App">
      <button onClick={toggleButtonStatus}>
        {buttonText}
      </button>
    </div>
  );
}

export default App;
