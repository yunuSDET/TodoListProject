let toDoList = document.querySelector("ul.list-group");
let bodyDOM = document.querySelector("body");

let toDoFormDOM = document.querySelector('#toDoForm');
toDoFormDOM.addEventListener('submit', addItem);

load();

function load() {
    let items = localStorage.getItem("items");
    if (!items) {
        items = [];
    } else {
        items = JSON.parse(items);

        for (let i = 0; i < items.length; i++) {
            addItemToList(items[i]);
        }
    }
}

function addLocalStorage(item) {
    let items = localStorage.getItem("items");

    if (!items) {
        items = [];
    } else {
        items = JSON.parse(items);
    }

    items.push(item);
    localStorage.setItem("items", JSON.stringify(items));
}

function deleteItem(button) {
    let listItem = button.closest("li");

    if (listItem) {
        listItem.remove();
        updateLocalStorage();
    }
}

function updateLocalStorage() {
    let toDoListItems = document.querySelectorAll("ul.list-group>li");
    let items = Array.from(toDoListItems).map(li => li.innerText);

    localStorage.setItem("items", JSON.stringify(items));
}

function addItem(event) {
    event.preventDefault();
    let input = document.querySelector('#toDoInput');
    if (input.value) {
        addItemToList(input.value);
        let temp = input.value;
        input.value = "";
        addLocalStorage(temp);
    } else {
        let errorDiv = document.createElement("div");
        errorDiv.innerHTML = '<div class="toast" role="alert" aria-live="assertive" aria-atomic="true"><div class="toast-header"><img src="/img/invalid.jpg" class="rounded me-2" alt="..." width="100" height="50"><strong class="me-auto"></strong><small class="text-body-secondary">recently</small><button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button></div><div class="toast-body">You should input a valid value</div></div>'
        bodyDOM.append(errorDiv);
        let toast = new bootstrap.Toast(errorDiv.querySelector('.toast'));
        toast.show();
    }
}

function addItemToList(item) {
    let liDOM = document.createElement("li");
    liDOM.classList.add("list-group-item", "close");
    liDOM.innerHTML = item + '<span class="close float-end"><button class="btn-close"></button></span>';
    toDoList.append(liDOM);

    let btnClose = liDOM.querySelector('.btn-close');
    btnClose.addEventListener('click', function () {
        deleteItem(btnClose);
    });
}
