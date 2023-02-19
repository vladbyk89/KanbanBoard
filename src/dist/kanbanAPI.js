var formList = document.getElementById("todo-form");
var input = document.getElementById("todo-input");
var todoLane = document.getElementById("todo-lane");
var rootList = document.querySelector("#rootList");
renderBoardInBoardPage();
backToMainBtn.addEventListener("click", function () { return (window.location.href = "index.html"); });
formList.addEventListener("submit", function (e) {
    e.preventDefault();
    if (rootList) {
        rootList.innerHTML += " <div class=\"boardContainer__main__list swim-lane\" draggable=\"true\">\n    <div class=\"boardContainer__main__list__header\">\n    <h3 contenteditable>" + input.value + "</h3>\n    <i class=\"fa-solid fa-ellipsis\"></i>\n    </div>\n    <div class=\"boardContainer__main__list__card__addCard\" >\n    <form todo-form>\n      <input type=\"text\" placeholder=\"Add New Card\" id=\"todo-input\">\n      <button type=\"submit\" class=\"addCardBtn\">\n        <i class=\"fa-solid fa-plus\">Add Card</i>\n      </form>\n    </button>\n  </div>\n    <div class=\"boardContainer__main__list__card task p1\">\n      <p class=\"p1\" draggable=\"true\">Create Element</p>\n      <i class=\"fa-regular fa-pen-to-square p1\"></i>\n    </div>\n    <div class=\"boardContainer__main__list__card task p1\">\n      <p class=\"p1\" draggable=\"true\">Create Element</p>\n      <i class=\"fa-regular fa-pen-to-square p1\"></i>\n    </div>\n    <div class=\"boardContainer__main__list__card task p1\">\n      <p class=\"p1\" draggable=\"true\">Create Element</p>\n      <i class=\"fa-regular fa-pen-to-square p1\"></i>\n    </div>\n    <div class=\"boardContainer__main__list__card task\" id=\"todo-lane\">\n      <p class=\"p1\" draggable=\"true\">Buy Itay Chocolate</p>\n      <i class=\"fa-regular fa-pen-to-square\"></i>\n    </div>\n    <div class=\"boardContainer__main__list__card task\" id=\"todo-lane\">\n      <p class=\"p1\" draggable=\"true\">Something else...</p>\n      <i class=\"fa-regular fa-pen-to-square\"></i>\n    </div>\n  </div>";
    }
    // else{
    //   if(!formList && input.value){
    //     return ;
    //   }
    // }
    e.stopImmediatePropagation();
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
});
// const formTask = document.querySelector("#todo-formTask");
// const addTask = document.querySelector("#addTask");
// addTask.addEventListener("submit", (e) => {
//   e.preventDefault();
//   if (addTask) {
//     rootTask.innerHTML += `<div class="boardContainer__main__list__card task p1">
//     <p class="p1" draggable="true">Create Element</p>
//     <i class="fa-regular fa-pen-to-square p1"></i>
//   </div>`;
//   }
// });
var addTask = document.getElementById("#Listrender");
var formTask = document.getElementById("#lolo");
formTask.addEventListener("submit", function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    if (addTask) {
        addTask.innerHTML = "<div class=\"boardContainer__main__list__card task p1\">\n    <p class=\"p1\" draggable=\"true\">Create lol</p>\n    <i class=\"fa-regular fa-pen-to-square p1\"></i>\n  </div>";
    }
});
//חסר לתפוס איפות
//
