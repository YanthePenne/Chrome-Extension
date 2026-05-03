// class order {
//   constructor(articleNumber, orderAmount, checked, inputted) {
//     const rowID = getRowIdByArtNr(articleNumber);
//     const inputElement = getInputElementByRowId(rowID);
//     const checkbox = getCheckboxByRowId(rowID);
//     const websiteAmount = this.getWebsiteAmount(orderAmount, inputElement);
//   }

//   /**
//    * Retrieves the amount of websites based on the provided parameters.
//    * @param {Object} params - An object containing parameters for the query, such as filters or criteria.
//    * @returns {number} The total amount of websites matching the parameters.
//    */
//   getWebsiteAmount(params) {
//     //round to the nearest whole number

//     return this.websiteAmount;
//   }

//   /**
//    * Returns the current order amount.
//    *
//    * @param {Object} params - Parameters for retrieving the order amount (currently unused).
//    * @returns {*} The value of the order amount.
//    */
//   getOrderAmount(params) {
//     return this.orderAmount;
//   }

//   /**
//    * Returns the article number.
//    *
//    * @param {any} params - Parameters for the method (currently unused).
//    * @returns {string|number} The article number.
//    */
//   getArticleNumber(params) {
//     return this.articleNumber;
//   }

//   /**
//    * Inputs an order into the website using the provided parameters.
//    *
//    * @param {Object} params - The parameters for the order input.
//    * @param {string|number} params.articleNumber - The article number to input.
//    * @param {boolean} params.checkbox - Whether the checkbox should be checked.
//    * @param {number} params.articleAmount - The amount of the article to input.
//    * @throws Will log an error and add to the exception list if input fails.
//    */
//   inputOrder(params) {
//     try {
//       const websiteAmount = this.getWebsiteAmount(params);

//       websiteOrderInput(this.inputElement, this.checkbox, params.articleAmount);
//     } catch (error) {
//       console.error("Error inputting order -> adding to exception list");
//     }
//   }
// }

// class orderList {
//   constructor() {
//     this.orders = [];
//   }

//   addOrder(order) {
//     this.orders.push(order);
//   }
// }

// // scope of these variables do they need to be global? can they be local to the function that uses them? if they need to be global, should they be in an object to avoid polluting the global namespace?
// const inputList = new orderList();
// const outputList = new orderList();

// const id = getRowIdByArtNr(25415);
// console.log(id); // Should print the ID of the row where the first cell is "25415"

// function getRowIdByArtNr(article_number) {
//   // The XPath: find the TR where the first TD has our text
//   const xpath = `//tr[td[1][text()='${article_number}']]`;

//   const result = document.evaluate(
//     xpath,
//     document,
//     null,
//     XPathResult.FIRST_ORDERED_NODE_TYPE,
//     null,
//   ).singleNodeValue;

//   return result ? result.id : "Row not found";
// }

// /**
//  * Retrieves the ID of a table row (<tr>) whose first cell (<td>) matches the given article number.
//  *
//  * @param {string} article_number - The article number to search for in the first cell of each row.
//  * @returns {string} The ID of the matching row if found, otherwise "Row not found".
//  */
// function getRowIdByArtNr(article_number) {
//   // The XPath: find the TR where the first TD has our text
//   const xpath = `//tr[td[1][text()='${article_number}']]`;

//   const result = document.evaluate(
//     xpath,
//     document,
//     null,
//     XPathResult.FIRST_ORDERED_NODE_TYPE,
//     null,
//   ).singleNodeValue;

//   return result ? result.id : "Row not found";
// }

// /**
//  * Retrieves the first <input> element within the DOM element specified by the given row ID.
//  *
//  * @param {string} rowId - The ID of the row element to search within.
//  * @returns {HTMLInputElement|null} The first input element found inside the specified row, or null if none exists.
//  */
// function getInputElementByRowId(rowId) {
//   // Find the input specifically INSIDE that row
//   // only works because specific inputElement I need is the first.
//   const inputElement = document.querySelector(`#${rowId} input`);
//   return inputElement ? inputElement : null;
// }
// /**
//  * Retrieves the checkbox input element within a table row by its row ID.
//  *
//  * @param {string} rowId - The ID of the row containing the checkbox.
//  * @returns {HTMLInputElement|null} The checkbox input element if found, otherwise null.
//  */
// function getCheckboxByRowId(rowId) {
//   // Find the checkbox specifically INSIDE that row
//   const checkbox = document.querySelector(`#${rowId} input[type="checkbox"]`);

//   return checkbox ? checkbox : null;
// }
// /**
//  * Sets the value of an input element, checks a checkbox, and triggers the appropriate events.
//  *
//  * @param {HTMLInputElement} input - The input element to set the value for.
//  * @param {HTMLInputElement} checkbox - The checkbox element to check and click.
//  * @param {string} value - The value to assign to the input element.
//  */
// function websiteOrderInput(input, checkbox, value) {
//   checkbox.checked = true; // Check the box first
//   input.value = value;

//   // Trigger input immediately
//   input.dispatchEvent(new Event("input", { bubbles: true }));
//   checkbox.click();
// }
