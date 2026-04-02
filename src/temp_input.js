// function name = camel case
// function parameters = underscore
// local function variables = camelcase

// Usage:
const rowId = getRowIdByArtNr("21517");
const inputElement = getInputElementByRowId(rowId);
const checkboxElement = getCheckboxByRowId(rowId);
console.log("Found ID:", rowId);
console.log("found ID:", inputElement);
console.log("found ID:", checkboxElement);
inputOrder(inputElement, checkboxElement, 12);

function getRowIdByArtNr(article_number) {
  // The XPath: find the TR where the first TD has our text
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
  // Find the input specifically INSIDE that row
  // only works because specific inputElement I need is the first.
  const inputElement = document.querySelector(`#${rowId} input`);
  return inputElement ? inputElement : null;
}

function getCheckboxByRowId(rowId) {
  // Find the checkbox specifically INSIDE that row
  const checkbox = document.querySelector(`#${rowId} input[type="checkbox"]`);

  return checkboxElement ? checkboxElement : null;
}

function inputOrder(input, checkbox, value) {
  checkbox.checked = true; // Check the box first
  input.value = value;

  // Trigger input immediately
  input.dispatchEvent(new Event("input", { bubbles: true }));
  checkbox.click();
}
