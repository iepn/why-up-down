let buttonVisible = true;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getButtonStatus') {
    sendResponse({ buttonVisible });
  } else if (request.action === 'toggleButtonStatus') {
    buttonVisible = !buttonVisible;
    sendResponse({ buttonVisible });
  }
});