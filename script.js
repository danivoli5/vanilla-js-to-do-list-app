//const elements from the dom
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const btnClear = document.getElementById('clear');
const filter = document.getElementById('filter');
const btnSubmit = itemForm.querySelector('button');
let isEditMode = false;

init();
//initialize app
function init() {
    //Event listeners
    itemForm.addEventListener('submit', addItem);
    itemList.addEventListener('click', onClickItem);
    btnClear.addEventListener('click', clearItems);
    filter.addEventListener('input', filterItems);
    document.addEventListener('DOMContentLoaded', loadItemsFromSotorage);


    //check UI to init application starting state
    checkUI();
}

//Util Functions

//add item to the list
function addItem(e) {
    e.preventDefault();

    const itemText = itemInput.value;
    //check the input
    if (itemText === '') {
        alert('please insert an item')
        return;
    }

    //on item edit

    if (isEditMode) {
        const grayItem = document.querySelector('[style="color: rgb(204, 204, 204);"]');
        //remove item from DOM
        grayItem.remove();
        //remove from storage
        removeItemFromStorage(grayItem);

        //isEditmode change to false in checkUI call
    }


    addItemToDOM(itemText);
    addItemToStorage(itemText);
}

function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;

    //append icon to button
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}

function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

//UI changes after click on item
function onClickItem(e) {
    //if the target of the event is the icon so his parent will be remove-item button -> whats mean the icon clicked.
    if (e.target.parentElement.classList.contains('remove-item')) {
        removeItem(e.target.parentElement.parentElement)
        //check UI
        checkUI();
    } else {
        onItemEdit(e.target);
    }
}

function onItemEdit(item) {
    isEditMode = true;

    //reset all items text color to black
    const items = document.querySelectorAll('li');
    items.forEach((i) => i.style.color = '#000000');

    //set target item text color to gray
    item.style.color = '#ccc';
    btnSubmit.innerHTML = '<i class="fa-solid fa-plus"></i> Update Item'

    //set submit button background to green
    btnSubmit.style.backgroundColor = '#228B22'

    //set input form text to the item text
    itemInput.value = item.innerText;

}

//remove spetific item from the list
function removeItem(item) {
    if (window.confirm('Are you sure?')) {
        {
            //remove from DOM
            item.remove();
            //remove from storage memory
            removeItemFromStorage(item);
            //refresh UI state
            checkUI();
        }
    }
}

function removeItemFromStorage(item) {
    let itemsFromStorage = checkItemsSotrage();
    //filter the item out from the array
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item.textContent);
    //set the filtered array in the local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}


//clear the all items from the list
function clearItems(e) {
    if (window.confirm('Are you sure?')) {
        itemList.innerHTML = '';
        //clear local storage
        localStorage.removeItem('items');
        //check UI
        checkUI();
    }

}

//check if the item list in the UI is empty
function checkUI() {
    //to disable clear all and filter
    const items = document.querySelectorAll('li');
    if (items.length == 0) {
        filter.style.display = 'none';
        btnClear.style.display = 'none';
    } else {
        filter.style.display = 'block';
        btnClear.style.display = 'block';
    }

    //reset submit button after editing
    if (isEditMode) {
        btnSubmit.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
        btnSubmit.style.backgroundColor = '#333';

        isEditMode = false;
    }
}

//filter the list item
function filterItems(e) {
    const items = document.querySelectorAll('li');
    const text = e.target.value.toLowerCase();

    items.forEach((item) => {
        //if equel to -1 it means that its not index of the string
        if (item.textContent.toLowerCase().indexOf(text) != -1) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    })``
}

function addItemToDOM(itemText) {
    //create new li element
    const newItem = document.createElement('li');
    newItem.textContent = itemText;
    //create delete button
    const deleteButton = createButton('remove-item btn-link text-red');

    //appand button to li element
    newItem.appendChild(deleteButton);
    //append li to ul element
    itemList.appendChild(newItem);

    //clear the input text field
    itemInput.value = '';

    //checkUI
    checkUI();
}

function addItemToStorage(itemText) {
    const itemsFromStorage = checkItemsSotrage();

    itemsFromStorage.push(itemText);
    //convert to json string and set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function checkItemsSotrage() {
    if (localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemsFromStorage;
}

//load item from localStorage to the DOM.
function loadItemsFromSotorage() {
    const itemsFromStorage = checkItemsSotrage();

    //add to DOM each item
    itemsFromStorage.forEach((item) => addItemToDOM(item));
}