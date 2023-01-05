import addSource from "./API/index.js";

const arr = ["Star wars", "Harry Potter", "matrix"];

/**
 *@param {HTMLElement}
  @returns {HTMLAllCollection}
 */
const mainContainer = document.getElementById("main_container");

/**
 * @param {HTMLAllCollection}
 * @returns {ObjectConstructor}
 */
const listItemContainer = addSource(mainContainer);

listItemContainer.addChildren(arr);
const allItem = listItemContainer.getAllItems();
listItemContainer.getUnselectedItems();
listItemContainer.getSelectedItems();
