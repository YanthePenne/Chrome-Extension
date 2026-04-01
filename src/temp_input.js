// function name = camel case
// function parameters = underscore
// local function variables = camelcase

// Usage:
const rowId = getRowIdByArtNr("21517");
const inputId = getInputIdByRowId(rowId);
console.log("Found ID:", rowId);
console.log("found ID:", inputId);
inputOrder(inputId, 12);

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

function getInputIdByRowId(rowId) {
  // Find the input specifically INSIDE that row
  const inputID = document.querySelector(`#${rowId} input`).id;
  return inputID ? inputID : null;
}

function inputOrder(input_id, value) {
  const input = document.getElementById(input_id);
  input.value = value;

  // Trigger input immediately
  input.dispatchEvent(new Event("input", { bubbles: true }));
}
