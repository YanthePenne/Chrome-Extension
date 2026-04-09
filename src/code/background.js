chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "PROCESS_FILE") {
    try {
      const parsedData = parseCSV(message.data);
      const result = performHeavyCalculation(parsedData);

      // Return result to popup
      sendResponse({ success: true, calculation: result });
    } catch (error) {
      sendResponse({ success: false, error: error.message });
    }
  }
  return true; // Keeps the message channel open for async responses
});

function parseCSV(csvText) {
  // Simple robust parser for comma-separated values
  const lines = csvText.split(/\r?\n/);
  return lines
    .filter((line) => line.trim() !== "")
    .map((line) => line.split(",").map((cell) => cell.trim()));
}

function performHeavyCalculation(data) {
  if (data.length === 0) return 0;
  // Example: Count rows excluding header
  const rowCount = data.length - 1;
  console.log(`Processed ${rowCount} rows.`);
  return rowCount;
}
