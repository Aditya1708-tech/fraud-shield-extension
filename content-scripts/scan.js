// Example auto-scanning (for future use)
function findMessages() {
  const nodes = document.querySelectorAll("span.selectable-text, .message-text");
  return Array.from(nodes).map(n => n.innerText).filter(Boolean);
}

const messages = findMessages();

if (messages.length > 0) {
  console.log("Fraud-Shield found messages on page:", messages);
  chrome.storage.local.set({ lastScannedMessages: messages });
}
