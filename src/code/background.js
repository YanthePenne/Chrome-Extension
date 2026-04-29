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
 * Parses a CSV/semicolon-separated values text into a 2D array.
 *
 * @param {string} csvText - The CSV text to parse, with lines separated by \n or \r\n
 *                           and values separated by semicolons.
 * @returns {string[][]} A 2D array where each inner array represents a row of parsed values.
 *                       Empty lines are filtered out.
 *
 * @example
 * const csv = "name;age\nJohn;30\nJane;25";
 * const result = parseCSV(csv);
 * // Returns: [["name", "age"], ["John", "30"], ["Jane", "25"]]
 */
function parseCSV(csvText) {
  // Simple robust parser for comma-separated values
  const lines = csvText.split(/\r?\n/);
  return lines
    .filter((line) => line.trim() !== "")
    .map((line) => line.split(";").map((cell) => cell.trim()));
}
/**
 * Performs a heavy calculation on the provided data.
 * @param {Array} data - The input data array to be processed.
 * @returns {number} The count of rows processed, excluding the header row. Returns 0 if data is empty.
 */

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

  // const headers = parsedData[0];
  // const artNrIndex = headers.indexOf("Product_Reference2"); // Matches "24232"
  // const qtyIndex = headers.indexOf("Line_QTY");

  /**
   * Iterate through the parsed CSV data, skipping the first row (headers).
   * For each data row, identify the active browser tab and send the specific
   * Article Number and Quantity to the Content Script for website injection.
   */
  // parsedData.slice(1).forEach((row) => {
  //   // Locate the tab currently focused by the user to ensure the message hits the correct page
  //   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  //     if (tabs[0]?.id) {
  //       // Transfer data from the background environment to the webpage DOM environment
  //       chrome.tabs.sendMessage(tabs[0].id, {
  //         action: "FILL_ROW",
  //         dataWithoutHeader: row[artNrIndex], // Extracted via dynamic index found earlier
  //         quantity: row[qtyIndex], // Extracted via dynamic index found earlier
  //       });
  //     }
  //   });
  // });
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]?.id) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "FILL_ROW",
        parsedData: parsedData,
      });
    }
  });
}
