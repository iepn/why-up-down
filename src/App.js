import React, { useState } from 'react';

function App() {
  const [buttonText, setButtonText] = useState('close');

  const sendMessageToContentScript = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { message: buttonText === 'close' });
    });

    setButtonText((prevText) => (prevText === 'close' ? 'open' : 'close'));
  };

  return (
    <div className="App">
      <button onClick={sendMessageToContentScript}>{buttonText}</button>
    </div>
  );
}

export default App;
