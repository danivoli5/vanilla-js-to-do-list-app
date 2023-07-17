//const elements from the dom
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const btnClear = document.getElementById('clear');


//Event listeners
itemForm.addEventListener('submit', addItem)
itemList.addEventListener('click', removeItem)
btnClear.addEventListener('click', clearItems)


//Util Functions

//add item to the list
function addItem(e){
    e.preventDefault();
    //check the input
    if(itemInput.value === ''){
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
}

function createButton(classes){
    const button = document.createElement('button');
    button.className = classes;

    //append icon to button
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}

function createIcon(classes){
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

//remove spetific item from the list
function removeItem(e){
    //if the target of the event is the icon so his parent will be remove-item button -> whats mean the icon clicked.
    if(e.target.parentElement.classList.contains('remove-item')){
        //remove the parent of the parent of the ican -> the all li element
        e.target.parentElement.parentElement.remove();
    }
}

//clear the all items from the list
function clearItems(e){
    itemList.innerHTML = '';
}