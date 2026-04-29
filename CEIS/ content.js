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
