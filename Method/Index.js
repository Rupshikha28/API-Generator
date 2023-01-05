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
   * @param {HTMLElement} listItem
   * @description wrapped item inside <li> and add EventListener to each item.
   */
  #addChild(node) {
    const list = document.createElement("li");
    this.#leftUl.append(list);
    list.className = "list_Item";
    list.innerHTML = node;
    list.addEventListener("click", (e) => this.#removeItem(e));
  }

  /**
   * @param {array || iterable}
   * @description call addNote Method for eachElement
   */
  addChildren(list) {
    let newlist = [];
    if (Array.isArray(list)) {
      newlist = [...list];
      newlist.forEach((val) => this.#addChild(val));
    } else if (!!list[Symbol.iterator]) {
      newlist = [...list];
      newlist.forEach((val) => this.#addChild(val.innerText));
    }
  }

  /**
   *
   * @param {HTMLElement}
   * @description Clone a Node and append this Node to the <uI> element
   */
  #addItemToRightConatiner(item) {
    const rightUl = document.getElementById("right_ul");
    let clonenode = item.cloneNode(true);
    clonenode.className = "displayitem";
    rightUl.append(clonenode);
  }

  /**
   *
   * @param {HTMLElement} e
   * @description remove a Node.
   */
  #removeItem(e) {
    const item = e.target;
    this.#addItemToRightConatiner(item);
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
    const arr = [];
    const listItems = this.#mainContainer.childNodes;
    for (let i = 0; i < listItems.length; i++) {
      arr.push(listItems[i].innerText);
    }
    console.log("arr", arr);
    let items = arr[1].split("\n");
    return items;
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
