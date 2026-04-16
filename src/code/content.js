/* global chrome */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  let notFound = [];

  request.data.forEach((row) => {
    // You must map 'row.selector' to the specific CSS selector in your CSV
    const targetElement = document.querySelector(row.selector);

    if (targetElement) {
      targetElement.value = row.value;

      // CRITICAL: Trigger events so the website's JavaScript notices the change
      targetElement.dispatchEvent(new Event("input", { bubbles: true }));
      targetElement.dispatchEvent(new Event("change", { bubbles: true }));
    } else {
      // Keep track of rows that couldn't be filled
      notFound.push(row);
    }
  });

  // Send the list of failed items back to popup.js for CSV generation
  sendResponse({ notFound: notFound });
  return true;
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "FILL_ROW") {
    const { articleNumber, quantity } = request;

    // 1. Get the Row ID using XPath
    const rowId = getRowIdByArtNr(articleNumber);

    if (rowId !== "Row not found") {
      // 2. Find the elements inside that specific row
      const inputField = getInputElementByRowId(rowId);
      const checkbox = getCheckboxByRowId(rowId);

      // 3. Perform the automation
      if (inputField && checkbox) {
        websiteOrderInput(inputField, checkbox, quantity);
        console.log(`Successfully filled Article: ${articleNumber}`);
      }
    } else {
      console.warn(`Article ${articleNumber} not found on this page.`);
    }
  }
});

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

function getInputElementByRowId(rowId) {
  return document.querySelector(`#${rowId} input`);
}

function getCheckboxByRowId(rowId) {
  return document.querySelector(`#${rowId} input[type="checkbox"]`);
}

function websiteOrderInput(input, checkbox, value) {
  // Check the box
  if (!checkbox.checked) {
    checkbox.checked = true;
  }

  // Set value
  input.value = value;

  // Trigger events
  input.dispatchEvent(new Event("input", { bubbles: true }));

  // Native .click() is best for checkboxes to trigger site logic
  checkbox.click();

  // Final safety sync
  checkbox.dispatchEvent(new Event("change", { bubbles: true }));
}
