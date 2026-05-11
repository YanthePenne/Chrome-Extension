// function name            = camel case
// function parameters      = underscore
// local function variables = camelcase
// Data Strcutures and Classes

// Ensure chrome API is available (for extension context)
if (typeof chrome === "undefined") {
  console.warn(
    "Chrome API is not available. Ensure this script runs as a Chrome extension background script.",
  );
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "PROCESS_FILE") {
    try {
      const parsedData = parseCSV(message.data);
      const dataWithoutHeader = parsedData.slice(1); // Remove header row if present

      console.log("processing csv");
      procesCSV(parsedData);

      // Return result to popup
      // output should be a csv that includes if the order was successfully inputted or not, if not, the csv should include the article number and quantity that failed to be inputted
      sendResponse({
        success: true,
      });
    } catch (error) {
      sendResponse({ success: false, error: error.message });
    }
  }
  return true; // Keeps the message channel open for async responses
});
/**
 * Parses a CSV formatted string into a 2D array of cells.
 *
 * @param {string} csvText - The CSV text to parse. May include a UTF-8 BOM character.
 * @returns {string[][]} A 2D array where each inner array represents a row of cells.
 *
 * @description
 * - Removes UTF-8 BOM character if present at the start
 * - Splits text by line breaks (both \n and \r\n)
 * - Filters out empty lines
 * - Splits each line by semicolons
 * - Trims whitespace from each cell
 * - Removes surrounding double quotes from cells
 * - Removes surrounding brackets from cells
 *
 * @example
 * const csv = 'name;age\n"John";30\n"Jane";25';
 * const result = parseCSV(csv);
 * Returns: [['name', 'age'], ['John', '30'], ['Jane', '25']]
 */
function parseCSV(csvText) {
  const cleanText = csvText.startsWith("\ufeff") ? csvText.slice(1) : csvText;
  const lines = cleanText.split(/\r?\n/);

  return lines
    .filter((line) => line.trim() !== "")
    .map((line) => {
      return line.split(";").map((cell) => {
        let trimmed = cell.trim();

        // Remove surrounding double quotes if they exist
        if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
          trimmed = trimmed.slice(1, -1);
        }

        // Remove surrounding brackets if your specific file uses them
        if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
          trimmed = trimmed.slice(1, -1);
        }

        return trimmed;
      });
    });
}
/**
 * Processes CSV data and creates order instances for each row.
 * @param {string[][]} parsedData - A 2D array where the first row contains column headers
 * @param {string[][]} dataWithoutHeader - A 2D array containing CSV data rows without the header
 * @returns {void}
 * @description Extracts article numbers and quantities from the CSV data,
 * creates new order instances, adds them to the input list, and processes each order.
 */
function procesCSV(parsedData) {
  // normalize data
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]?.id) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "FILL_ROW",
        parsedData: parsedData,
      });
    }
  });
}
