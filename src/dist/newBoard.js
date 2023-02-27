var cards = document.querySelectorAll(".boardContainer__main__list__card");
var listElements = document.querySelectorAll(".boardContainer__main__list");
boardContainer.addEventListener("dragover", function (e) {
    var cardIsDragged = false;
    cards.forEach(function (card) {
        if (card.classList.contains("is-dragging")) {
            cardIsDragged = true;
        }
    });
    if (cardIsDragged)
        return;
    e.preventDefault();
    var leftList = insertLeftOfLisk(boardContainer, e.clientX);
    var curList = boardContainer.querySelector(".is-draggin");
    if (!leftList) {
        boardContainer.appendChild(curList);
    }
    else {
        boardContainer.insertBefore(curList, leftList);
    }
});
var insertLeftOfLisk = function (zone, mouseX) {
    var staticLists = zone.querySelectorAll(".boardContainer__main__list:not(.is-dragging)");
    var closestTask = null;
    var closestOffset = Number.NEGATIVE_INFINITY;
    staticLists.forEach(function (list) {
        var cardBoundaries = list.getBoundingClientRect();
        var offset = mouseX - cardBoundaries.left - cardBoundaries.width / 2;
        if (offset < 0 && offset > closestOffset) {
            closestOffset = offset;
            closestTask = list;
        }
    });
    return closestTask;
};
var insertAboveTask = function (zone, mouseY) {
    var staticCards = zone.querySelectorAll(".boardContainer__main__list__card:not(.is-dragging)");
    var closestTask = null;
    var closestOffset = Number.NEGATIVE_INFINITY;
    staticCards.forEach(function (card) {
        var cardBoundaries = card.getBoundingClientRect();
        var offset = mouseY - cardBoundaries.top - cardBoundaries.height / 2;
        if (offset < 0 && offset > closestOffset) {
            closestOffset = offset;
            closestTask = card;
        }
    });
    return closestTask;
};
function createListElement(list) {
    var listContainer = document.createElement("div");
    listContainer.classList.add("boardContainer__main__list");
    listContainer.setAttribute("draggable", "true");
    listContainer.setAttribute("id", "" + list.uid);
    var header = document.createElement("div");
    header.classList.add("boardContainer__main__list__header");
    // header.setAttribute("draggable", "true");
    header.setAttribute("id", list.name + "_header");
    header.innerHTML = "\n  <div class=\"listTitle\" >\n    <h2>" + list.name + "</h2>\n    <i class=\"fa-regular fa-pen-to-square editListBtn\"></i>\n    </div>\n    <div class=\"boardContainer__main__list__card--addCard\">\n      <textarea maxlength=\"30\" class=\"newCardTextArea\" cols=\"30\" rows=\"3\"></textarea>\n      <button class=\"newCardBtn\">New Card</button>\n    </div>\n  ";
    listContainer.addEventListener("dragstart", function () {
        listContainer.classList.add("is-draggin");
    });
    listContainer.addEventListener("dragend", function () {
        listContainer.classList.remove("is-draggin");
    });
    listContainer.appendChild(header);
    listContainer.addEventListener("dragover", function (e) {
        var cardIsDragged = false;
        cards.forEach(function (card) {
            if (card.classList.contains("is-dragging")) {
                cardIsDragged = true;
            }
        });
        if (!cardIsDragged)
            return;
        e.preventDefault();
        var bottomTask = insertAboveTask(listContainer, e.clientY);
        var curTask = document.querySelector(".is-dragging");
        if (!bottomTask) {
            listContainer.appendChild(curTask);
        }
        else {
            listContainer.insertBefore(curTask, bottomTask);
        }
    });
    return listContainer;
}
function createNewCard(cardName, list) {
    var card = document.createElement("div");
    card.classList.add("boardContainer__main__list__card");
    card.setAttribute("draggable", "true");
    card.innerHTML = "\n  <p>" + cardName + "</p>\n  <i class=\"fa-regular fa-pen-to-square editCardBtn\"></i>\n  ";
    var cardTitle = list.querySelector(".boardContainer__main__list__header");
    list.insertBefore(card, cardTitle.nextSibling);
    card.addEventListener("dragstart", function () {
        card.classList.add("is-dragging");
    });
    card.addEventListener("dragend", function () {
        card.classList.remove("is-dragging");
    });
    // Add new card to cards variable
    cards = document.querySelectorAll(".boardContainer__main__list__card");
}
//contenteditable function for editing name
// const cardMovement = () => {
//   const grabCard = document.querySelectorAll(
//     ".boardContainer__main__list__card"
//   );
//   const drappables = document.querySelectorAll(
//     ".boardContainer__main__list"
//   );
//   grabCard.forEach((task) => {
//     task.addEventListener("dragstart", () => {
//       task.classList.add("is-dragging");
//     });
//     task.addEventListener("dragend", () => {
//       task.classList.remove("is-dragging");
//     });
//   });
//   drappables.forEach((zone) => {
//     zone.addEventListener("dragover", (e) => {
//       const bottomTask = insertAboveTask(zone, e.clientY); //e.screenY //pageY
//       const curTask = document.querySelector(".is-dragging") as HTMLDivElement;
//       if (!bottomTask) {
//         zone.appendChild(curTask);
//       } else {
//         zone.insertBefore(curTask, bottomTask);
//       }
//     });
//   });
//   const insertAboveTask = (zone, mouseY) => {
//     const els = zone.querySelectorAll(
//       ".boardContainer__main__list__card:not(.is-dragging)"
//     ) as NodeListOf<HTMLDivElement>;
//     let closestTask;
//     let closestOffset = Number.NEGATIVE_INFINITY;
//     els.forEach((task) => {
//       const { top } = task.getBoundingClientRect();
//       const offset = mouseY - top;
//       if (offset < 0 && offset > closestOffset) {
//         closestOffset = offset;
//         closestTask = task;
//       }
//     });
//     return closestTask;
//   };
// };
// column.appendChild(listContainer);
// const dropZones = document.querySelectorAll(".boardContainer__main");
// dropZones.forEach((dropZone) => {
//   dropZone.addEventListener("dragover", function (e) {
//     e.preventDefault();
//     dropZone.classList.add("dragover");
//   });
//   dropZone.addEventListener("dragenter", function (e) {
//     e.preventDefault();
//     dropZone.classList.add("dragover");
//   });
//   dropZone.addEventListener("dragleave", function (e) {
//     dropZone.classList.remove("dragover");
//   });
//   dropZone.addEventListener("drop", function (e) {
//     e.preventDefault();
//     const draggedItemId = e.dataTransfer.getData("text/plain");
//     if (!draggedItemId) {
//       return;
//     }
//     const draggedItem = document.getElementById(draggedItemId) as HTMLElement;
//     draggedItem?.parentElement?.appendChild(
//       dropZone.firstElementChild as HTMLElement
//     );
//     dropZone.appendChild(draggedItem);
//     dropZone.classList.remove("dragover");
//   });
// });
