// Ensure chrome API is available (for extension context)
if (typeof chrome === "undefined") {
  console.warn(
    "Chrome API is not available. Ensure this script runs as a Chrome extension background script.",
  );
}

// I do not think below code is actually used anywhere lol
// /* global chrome */
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   let notFound = [];

//   request.data.forEach((row) => {
//     // You must map 'row.selector' to the specific CSS selector in your CSV
//     const targetElement = document.querySelector(row.selector);

//     if (targetElement) {
//       targetElement.value = row.value;

//       // CRITICAL: Trigger events so the website's JavaScript notices the change
//       targetElement.dispatchEvent(new Event("input", { bubbles: true }));
//       targetElement.dispatchEvent(new Event("change", { bubbles: true }));
//     } else {
//       // Keep track of rows that couldn't be filled
//       notFound.push(row);
//     }
//   });

//   // Send the list of failed items back to popup.js for CSV generation
//   sendResponse({ notFound: notFound });
//   return true;
// });

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "FILL_ROW") {
    const { parsedData } = request;
    const headers = parsedData[0]; // Assuming first row is headers
    const artNrIndex = headers.indexOf("Product_Reference2"); // Matches "24232"
    const qtyIndex = headers.indexOf("Line_QTY");

    parsedData.slice(1).forEach((row) => {
      const articleNumber = row[artNrIndex];
      const quantity = row[qtyIndex];

      // 1. Get the Row ID using XPath
      const rowId = getRowIdByArtNr(articleNumber);

      if (rowId !== "Row not found") {
        // 2. Find the elements inside that specific row
        const inputField = getInputElementByRowId(rowId);
        const checkbox = getCheckboxByRowId(rowId);

        // 3. Perform the automation
        if (inputField && checkbox) {
          const websiteQuantity = getWebsiteQuantity(quantity, rowId);
          websiteOrderInput(inputField, checkbox, websiteQuantity);
          console.log(`Successfully filled Article: ${articleNumber}`);
        } else {
          console.warn(
            `Article currently unavailable for ordering: ${articleNumber}.`,
          );
        }
      } else {
        //TODO add to list
        console.warn(`Article ${articleNumber} not found on this page.`);
      }
    });
  }
});

/**
 * Retrieves the ID of a table row by matching the article number in the first column.
 * @param {string} article_number - The article number to search for in the first column of table rows
 * @returns {string} The ID attribute of the matching row, or "Row not found" if no match exists
 */
function getRowIdByArtNr(article_number) {
  const xpath = `//tr[td[1][text()='${article_number}']]`;
  const result = document.evaluate(
    xpath,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null,
  ).singleNodeValue;
  return result ? result.id : "Row not found";
}

/**
 * Retrieves the input element within the element identified by the given row ID.
 *
 * @param {string} rowId - The ID of the row element containing the input.
 * @returns {HTMLInputElement|null} The input element if found, otherwise null.
 */
function getInputElementByRowId(rowId) {
  return document.querySelector(`#${rowId} input`);
}

/**
 * Retrieves the checkbox input element within a row specified by its ID.
 *
 * @param {string} rowId - The ID of the row element containing the checkbox.
 * @returns {HTMLInputElement|null} The checkbox input element if found, otherwise null.
 */
function getCheckboxByRowId(rowId) {
  return document.querySelector(`#${rowId} input[type="checkbox"]`);
}

/**
 * Retrieves the unit amount text content for a given row by its ID.
 *
 * @param {string} rowId - The ID of the row element to search within.
 * @returns {string|null} The trimmed text content of the unit amount element,
 *   or null if the element is not found.
 */
function getUnitAmountByRowId(rowId) {
  const unitAmountElement = document.querySelector(
    `#${rowId} .consumer-units-count`,
  );
  return unitAmountElement ? unitAmountElement.textContent.trim() : null;
}

/**
 * Calculates the website quantity based on the provided quantity and row ID.
 *
 * @param {number} quantity - The total quantity to be converted.
 * @param {string|number} rowID - The identifier for the row to retrieve the unit amount.
 * @returns {string} The calculated website quantity as a string.
 */
function getWebsiteQuantity(quantity, rowID) {
  const unitAmount = getUnitAmountByRowId(rowID);
  const websiteAmount = Math.ceil(quantity / unitAmount);
  return String(websiteAmount); // Return the calculated website quantity
}

/**
 * Updates the value of an input field by adding a specified value, checks a checkbox if not already checked,
 * and dispatches relevant events to ensure site logic is triggered.
 *
 * @param {HTMLInputElement} input - The input element whose value will be updated.
 * @param {HTMLInputElement} checkbox - The checkbox element to be checked if not already checked.
 * @param {number|string} value - The value to add to the input's current value.
 */
function websiteOrderInput(input, checkbox, value) {
  const input_value = parseInt(input.value) || 0; // Get current value or default to 0
  let newValue = input_value + parseInt(value); // Add the new value to existing

  // Check the box
  if (!checkbox.checked) {
    // Native .click() is best for checkboxes to trigger site logic
    checkbox.click();
    newValue = input_value + parseInt(value) - 1;
  }

  input.value = newValue; // Update the input field with the new total

  // Trigger events
  input.dispatchEvent(new Event("input", { bubbles: true }));

  // Final safety sync
  checkbox.dispatchEvent(new Event("change", { bubbles: true }));
}
