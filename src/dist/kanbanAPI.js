//   function readLocalStorage() {
//     const json = localStorage.getItem("board-data");
//     if (!json) {
//       return [
//         {
//           id: 1,
//           items: [],
//         },
//         {
//           id: 2,
//           items: [],
//         },
//         {
//           id: 3,
//           items: [],
//         },
//       ];
//     }
//     return JSON.parse(json);
//   }
//   function sevelocalStorage(data) {
//     localStorage.setItem("board-data", JSON.stringify(data));
//   }
var draggables = document.querySelectorAll(".boardContainer__main__list__card");
draggables.forEach(function (task) {
    task.addEventListener("dragstart", function () {
        console.log(task);
        task.classList.add("is-dragging");
    });
    task.addEventListener("dragend", function () {
        console.log(task);
        task.classList.remove("is-dragging");
    });
});
var draggablesList = document.querySelectorAll(".boardContainer__main__list");
draggablesList.forEach(function (task) {
    task.addEventListener("dragstart", function () {
        console.log(task);
        task.classList.add("is-draggingList");
    });
    task.addEventListener("dragend", function () {
        console.log(task);
        task.classList.remove("is-draggingList");
    });
});
var draggablesAll = document.querySelectorAll("boardContainer__main__list__card");
draggablesAll.forEach(function (zone) {
    zone.addEventListener("dragstart", function (e) {
        e.preventDefault();
        var bottomTask = insertAboveTask(zone, e.clientY); //${e.screenY}
        var curCard = document.querySelector("is-draggingList");
        if (!bottomTask) {
            zone.appendChild(curCard);
        }
    });
});
var insertAboveTask = function (zone, mouseY) {
    var els = zone.querySelectorAll(".boardContainer__main__list__card:not(.is-dragging)");
    var closestCard = null;
    var closestOffset = Number.NEGATIVE_INFINITY;
    els.forEach(function (card) {
        var top = card.getBoundingClientRect().top;
        var offset = mouseY - top;
        if (offset < 0 && offset > closestOffset) {
            closestOffset = offset;
            closestCard = card;
        }
    });
    return closestCard;
};
