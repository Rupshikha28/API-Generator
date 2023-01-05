# API-Generator
It creates two cards and add items to the one of carts. We can move items from one card to another card.

## addSource Method
We have to import addSource Method in your JS file.

````
import addSource from "./API/index.js";
````

It takes a parent div as a parameter

````
const mainContainer = document.getElementById("main_container");
const listItemContainer = addSource(mainContainer);
````

## addChildren
It prints all Items. It takes List of items as parameter.
````
listItemContainer.addChildren(arr);
````

## getAllItems()
It print all the items.

## getUnselectedItems()
It prints all the unselected items.

## getSelectedItems() 
It prints all the selected items.



