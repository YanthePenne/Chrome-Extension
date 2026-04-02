// This script is intended to run in a Chrome extension context
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "PROCESS_FILE") {
    const result = performHeavyCalculation(message.data);

    // Return result to popup
    sendResponse({ calculation: result });
  }
  return true; // Keeps the message channel open for async responses
});

function performHeavyCalculation(data) {
  // Example: Count words or sum numbers
  return data.split(/\s+/).length;
}
