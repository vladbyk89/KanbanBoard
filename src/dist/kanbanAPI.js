// renderBoardInBoardPage();
// backToMainBtn.addEventListener("click", () => {
//   localStorage.removeItem("currentBoard");
//   window.location.href = "index.html";
// });
function movement() {
    var grabCard = document.querySelectorAll(".task");
    var drappables = document.querySelectorAll(".swim-lane");
    grabCard.forEach(function (task) {
        task.addEventListener("dragstart", function () {
            task.classList.add("is-dragging");
        });
        task.addEventListener("dragend", function () {
            task.classList.remove("is-dragging");
        });
    });
    drappables.forEach(function (zone) {
        zone.addEventListener("dragover", function (e) {
            e.preventDefault();
            var bottomTask = insertAboveTask(zone, e.clientY); //e.screenY //pageY
            var curTask = document.querySelector(".is-dragging");
            if (!bottomTask) {
                zone.appendChild(curTask);
            }
            else {
                zone.insertBefore(curTask, bottomTask);
            }
        });
    });
    var insertAboveTask = function (zone, mouseY) {
        var els = zone.querySelectorAll(".task:not(.is-dragging)");
        var closestTask = null;
        var closestOffset = Number.NEGATIVE_INFINITY;
        els.forEach(function (task) {
            var top = task.getBoundingClientRect().top;
            var offset = mouseY - top;
            if (offset < 0 && offset > closestOffset) {
                closestOffset = offset;
                closestTask = task;
            }
        });
        return closestTask;
    };
    var value = input.value;
    if (!value)
        return;
    var newTask = document.createElement("p");
    newTask.classList.add("task");
    newTask.setAttribute("draggable", "true");
    newTask.innerText = value;
    newTask.addEventListener("dragstart", function () {
        newTask.classList.add("is-dragging");
    });
    newTask.addEventListener("dragend", function () {
        newTask.classList.remove("is-dragging");
    });
    todoLane.appendChild(newTask);
    input.value = "";
}
var formList = document.getElementById("todo-form");
var input = document.getElementById("todo-input");
var rootList = document.querySelector("#rootList");
formList.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log(rootList);
    if (rootList) {
        var indexValue = rootList.childElementCount + 1;
        rootList.innerHTML += "<div class=\"boardContainer__main__list swim-lane\" draggable=\"true\">\n    <div class=\"boardContainer__main__list__header\">\n    <h3 contenteditable>" + input.value + "</h3>\n    <i class=\"fa-solid fa-ellipsis\"></i>\n    </div>\n    <div class=\"boardContainer__main__list__card__addCard\" >\n    <form id=\"formList\" onsubmit=\"return fixture(" + indexValue + ")\">\n    <input type=\"text\" placeholder=\"Add New Card\" id=\"addTask_" + indexValue + "\">\n    <button id=\"addCardBtn\">\n    <i class=\"fa-solid fa-plus\">Add Card</i>\n    </button>\n    </form>\n    </div>\n    <div id=\"rootTask_" + indexValue + "\"></div>\n  ";
    }
    input.value = "";
    movement();
    fixture;
});
var fixture = function (indexValue) {
    var rootTask = document.querySelector("#rootTask_" + indexValue);
    var todo_input = document.getElementById("addTask_" + indexValue);
    console.log(todo_input);
    if (rootTask) {
        rootTask.innerHTML += "<div class=\"boardContainer__main__list__card task p1\">\n          <p class=\"p1\" draggable=\"true\">" + todo_input.value + "</p>\n          <i class=\"fa-regular fa-pen-to-square p1\"></i>\n        </div>";
    }
    movementList();
    movement();
    input.value = "";
    return false;
};
function movementList() {
    var grabCard = document.querySelectorAll(".swim-lane");
    var drappables = document.querySelectorAll(".boardContainer__main");
    swim - lane;
    grabCard.forEach(function (task) {
        task.addEventListener("dragstart", function () {
            task.classList.add("is-dragging");
        });
        task.addEventListener("dragend", function () {
            task.classList.remove("is-dragging");
        });
    });
    drappables.forEach(function (zone) {
        zone.addEventListener("dragover", function (e) {
            e.preventDefault();
            var bottomTask = insertAboveTask(zone, e.clientY); //e.screenY //pageY
            var curTask = document.querySelector(".is-dragging");
            if (!bottomTask) {
                zone.appendChild(curTask);
            }
            else {
                zone.insertBefore(curTask, bottomTask);
            }
        });
    });
}
