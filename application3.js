let todoItemsContainer = document.getElementById("todoItemsContainer");
let savingButton = document.getElementById("savingButton");
savingButton.onclick = function() {
    saving();
}

function gettodolist() {
    let getteditem = localStorage.getItem("todoList");
    let objecttodolist = JSON.parse(getteditem);
    if (objecttodolist === null) {
        return [];
    } else {
        return objecttodolist;
    }
}

let todoList = gettodolist();

function saving() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

let todoNumber = todoList.length;

function onstatus(checkid, labelid, todoid) {
    let checkk = document.getElementById(checkid);
    let labell = document.getElementById(labelid);
    labell.classList.toggle("checkedd");

    let todoobjectIndex = todoList.findIndex(function(element) {
        let eachtodoid = "todo" + element.num;
        if (eachtodoid === todoid) {
            return true;
        } else {
            return false;
        }
    });

    let todoObject = todoList[todoobjectIndex];
    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    } else {
        todoObject.isChecked = true;
    }
}

function deleteElement(todoid) {
    let todo = document.getElementById(todoid);
    todoItemsContainer.removeChild(todo);

    let index = todoList.findIndex(function(eachItem) {
        let verify = "todo" + eachItem.num;
        if (verify === todoid) {
            return true;
        } else {
            return false;
        }
    });
    todoList.splice(index, 1);
}


function createAndAppendTodo(todo) {
    let checkid = "checkbox" + todo.num;
    let labelid = "label" + todo.num;
    let todoid = "todo" + todo.num;
    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoItemsContainer.appendChild(todoElement);
    todoElement.id = todoid;

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkid;
    inputElement.checked = todo.isChecked;
    inputElement.onclick = function() {
        onstatus(checkid, labelid, todoid);
    }
    inputElement.classList.add("checkbox-input");
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkid);
    labelElement.classList.add("checkbox-label");
    labelElement.id = labelid;
    if (todo.isChecked === true) {
        labelElement.classList.add("checkedd");
    }
    labelElement.textContent = todo.text;
    labelContainer.appendChild(labelElement);

    let deleteContainer = document.createElement("div");
    deleteContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteContainer.appendChild(deleteIcon);
    deleteIcon.onclick = function() {
        deleteElement(todoid);
    }

}

for (let todo of todoList) {
    createAndAppendTodo(todo);
}

function clickAdd() {
    let todoserInput = document.getElementById("todoUserInput");
    let userValue = todoserInput.value;
    console.log("Val" + userValue);
    if (userValue == "") {
        alert("Enter Valid Text");
        return;
    }
    todoNumber = todoNumber + 1;
    let newTodo = {
        text: userValue,
        num: todoNumber,
        isChecked: false
    }
    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    todoserInput.value = "";
}

let AddOn = document.getElementById("addingbutton");
AddOn.onclick = function() {
    clickAdd();
}

console.log(todoItemsContainer);