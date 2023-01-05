import Item from "../Method/index.js";

/**
 *
 * @param {HTMLCollectionOf<Element>} item
 * @returns {Item Object}
 */
function addSource(item) {
  return new Item(item);
}

export default addSource;
