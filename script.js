//const elements from the dom
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const btnClear = document.getElementById('clear');
const filter = document.getElementById('filter');


//Event listeners
itemForm.addEventListener('submit', addItem)
itemList.addEventListener('click', removeItem)
btnClear.addEventListener('click', clearItems)
filter.addEventListener('input', filterItems)

//check UI to init application starting state
checkUI();


//Util Functions

//add item to the list
function addItem(e) {
    e.preventDefault();
    //check the input
    if (itemInput.value === '') {
        alert('please insert an item')
        return;
    }

    //create new li element
    const newItem = document.createElement('li');
    newItem.textContent = itemInput.value;
    //create delete button
    const deleteButton = createButton('remove-item btn-link text-red');

    //appand button to li element
    newItem.appendChild(deleteButton);
    //append li to ul element
    itemList.appendChild(newItem);

    //clear the input text field
    itemInput.value = '';

    //check UI
    checkUI();
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

//remove spetific item from the list
function removeItem(e) {
    //if the target of the event is the icon so his parent will be remove-item button -> whats mean the icon clicked.
    if (e.target.parentElement.classList.contains('remove-item')) {
        if (window.confirm('Are you sure?')) {
            //remove the parent of the parent of the ican -> the all li element
            e.target.parentElement.parentElement.remove();
            //check UI
            checkUI();
        }
    }
}

//clear the all items from the list
function clearItems(e) {
    if (window.confirm('Are you sure?')) {
        itemList.innerHTML = '';
        //check UI
        checkUI();
    }

}

//check if the item list in the UI is empty
function checkUI() {
    const items = document.querySelectorAll('li');
    if (items.length == 0) {
        filter.style.display = 'none';
        btnClear.style.display = 'none';
    } else {
        filter.style.display = 'block';
        btnClear.style.display = 'block';
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
    })

}