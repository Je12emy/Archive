let inputElement = document.getElementById('input')
let todoList = document.getElementById('list')
let listedItems = document.querySelectorAll('.todo-item')

function DefineClassNames(listRow, listItem, removeButton, removeIcon){
    listRow.className = 'list-row'
    listItem.className = 'todo-item'
    removeButton.className = 'removeButton'
    removeIcon.className = 'fas fa-trash-alt fa-2x'
}

function appendAllChildren(listRow, listItem, removeButton, removeIcon){
    removeButton.appendChild(removeIcon)
    listItem.textContent = inputElement.value
    listItem.appendChild(removeButton)
    listRow.appendChild(listItem)
    todoList.appendChild(listRow)
    inputElement.value = ''
}

inputElement.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
        if (inputElement.value) {
            let listRow = document.createElement('div')
            let listItem = document.createElement('li')
            let removeButton = document.createElement('button')
            let removeIcon = document.createElement('i')

            DefineClassNames(listRow,listItem,removeButton,removeIcon)
            appendAllChildren(listRow,listItem,removeButton,removeIcon)          
            updateItems()
        }
    }
});

function updateItems() {
    listedItems = document.querySelectorAll('.todo-item')
    let removeButtons = document.querySelectorAll('.removeButton')
    
    listedItems.forEach((item, index) => {
        //* If the item has not been listed, add it
        if (item.getAttribute('listed') === null) {
            item.setAttribute('listed', true)
            removeButtons[index].addEventListener('click', () => {
                let rows = document.querySelectorAll('.list-row')
                todoList.removeChild(rows[index])
            })
            item.addEventListener('click', () => {
                if (item.style.textDecoration.toString() === 'none') {
                    item.style.textDecoration = 'line-through'
                } else {
                    item.style.textDecoration = 'none'
                }
            })
        } else {
            //? The item has already been listed, and has all it's events ready
        }
    });
}
updateItems()


