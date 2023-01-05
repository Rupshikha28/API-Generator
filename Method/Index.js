const listContainer = document.getElementById("list-container");
const movieContainer = document.getElementById("movie_list_container");

export default class ParentController {
  #mainContainer;
  #leftUl;
  #rightUl;

  constructor(item) {
    if ((item === undefined) | (item === null))
      throw new Error("Item is not defind!");
    if (!(item instanceof HTMLElement))
      throw new Error("Item is not HTML element!");

    this.#mainContainer = item;
    this.#createChildContainers();
  }

  /**
   * @description Create two multi-select containers
   */
  #createChildContainers() {
    const leftContainer = document.createElement("div");
    this.#leftUl = document.createElement("ul");
    leftContainer.id = "Left_container";
    this.#leftUl.id = "left_ul";
    this.#mainContainer.append(leftContainer);
    leftContainer.append(this.#leftUl);

    const rightContainer = document.createElement("div");
    this.#rightUl = document.createElement("ul");
    rightContainer.id = "right_container";
    this.#rightUl.id = "right_ul";
    this.#mainContainer.append(rightContainer);
    rightContainer.append(this.#rightUl);
  }

  /**
   * @param {HTMLElement} node
   * @description wrapped item inside <li> and add EventListener to each item.
   */
  addChild(node) {
    const list = document.createElement("li");
    this.#leftUl.append(list);
    list.className = "list_Item";
    list.innerHTML = node;
    list.addEventListener("click", (e) => this.#removeItem(e));
  }

  /**
   * @param {array || iterable} list
   * @description call addNote Method for eachElement
   */
  addChildren(list) {
    let newList = [];
    if (Array.isArray(list)) {
      newList = [...list];
      newList.forEach((val) => this.addChild(val));
    } else if (!!list[Symbol.iterator]) {
      newList = [...list];
      newList.forEach((val) => this.addChild(val.innerText));
    }
  }

  /**
   *  @param {HTMLElement} e
   *  @description remove a node from right container.
   */
  #rightItemRemove(e) {
    const item = e.target;
    this.#addItemToLeftContainer(item);
    item.remove();
  }

  /**
   *
   * @param {HTMLElement} item
   * @description Clone a Node and append this Node to the <uI> element of Left container
   */

  #addItemToLeftContainer(item) {
    const leftUl = document.getElementById("left_ul");
    let clonenode = item.cloneNode(true);
    clonenode.className = "displayitem";
    leftUl.append(clonenode);
    clonenode.addEventListener("click", (e) => this.#removeItem(e));
  }

  /**
   *
   * @param {HTMLElement} item
   * @description Clone a Node and append this Node to the <uI> element of right container
   */
  #addItemToRightContainer(item) {
    const rightUl = document.getElementById("right_ul");
    let clonenode = item.cloneNode(true);
    clonenode.className = "displayitem";
    rightUl.append(clonenode);
    clonenode.addEventListener("click", (e) => this.#rightItemRemove(e));
  }

  /**
   *
   * @param {HTMLElement} e
   * @description remove a node from left container.
   */
  #removeItem(e) {
    const item = e.target;
    this.#addItemToRightContainer(item);
    item.remove();
  }

  /**
   *
   * @param {Array<HTMLElement>} listItems
   * @returns {HTMLCollectionOf<Element>}
   */

  #displayListItems(listItems) {
    const arr = [];
    for (let i = 0; i < listItems.length; i++) {
      arr.push(listItems[i].innerText);
    }
    return arr;
  }

  /**
   *
   * @returns {HTMLCollectionOf<Element>}
   */
  getAllItems() {
    let arr = [];
    const leftChild = this.#leftUl.childNodes;
    const leftItems = this.#displayListItems(leftChild);

    const rightChild = this.#rightUl.childNodes;
    const rightItems = this.#displayListItems(rightChild);
    arr = [...leftItems, ...rightItems];
    return arr;
  }

  /**
   * @returns {HTMLElement}
   */
  getUnselectedItems() {
    const listItems = this.#leftUl.childNodes;
    const items = this.#displayListItems(listItems);
    return items;
  }

  /**
   * @returns {HTMLElement}
   */
  getSelectedItems() {
    const listItems = this.#rightUl.childNodes;
    const items = this.#displayListItems(listItems);
    return items;
  }
}
