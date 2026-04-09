// Code that converts the csv input to data structure that can be used.
function validateCSVHeaders(headers) {
  const requiredHeaders = ["Name", "Age", "Email"];
  return requiredHeaders.every((header) => headers.includes(header));
}

function convertToObjects(rows) {
  const headers = rows[0];
  return rows.slice(1).map((row) => {
    return headers.reduce((obj, header, index) => {
      obj[header] = row[index];
      return obj;
    }, {});
  });
}
