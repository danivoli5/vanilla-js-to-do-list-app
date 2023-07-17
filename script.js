const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');



//Event listeners
itemForm.addEventListener('submit', addItem)


//Util Functions
function addItem(e){

    e.preventDefault();

    //create new li element
    const newItem = document.createElement('li');
    newItem.textContent = itemInput.value;
    //create delete button
    const deleteButton = createButton('remove-item btn-link text-red');

    //appand button to li element
    newItem.appendChild(deleteButton);
    
    //append li to ul element
    itemList.appendChild(newItem);

    console.log(e);
    console.log(itemForm);
    console.log(itemInput);
    console.log(itemList);
}

function createButton(classes){
    const button = document.createElement('button');
    button.className = classes;

    //add icon to button
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);

    return button;
}

function createIcon(classes){
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}