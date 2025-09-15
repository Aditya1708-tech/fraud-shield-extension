chrome.action.onClicked.addListener((tab) => {
  // Inject scan.js into the current tab
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content-scripts/scan.js"]
  });
});
