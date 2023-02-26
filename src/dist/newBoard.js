function createNewColumn(list) {
    var column = document.createElement("div");
    column.classList.add("boardContainer__main__column");
    var listContainer = document.createElement("div");
    listContainer.classList.add("boardContainer__main__column__list");
    listContainer.setAttribute("draggable", "true");
    listContainer.setAttribute("id", "" + list.uid);
    listContainer.addEventListener("dragstart", function (hgvyhb_containere) {
        var _a, _b;
        (_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.setData("text/plain", (_b = e.target) === null || _b === void 0 ? void 0 : _b.id);
    });
    var header = document.createElement("div");
    header.classList.add("boardContainer__main__column__list__header");
    header.setAttribute("id", list.name + "_header");
    header.innerHTML = "\n  <div class=\"listTitle\">\n    <h2>" + list.name + "</h2>\n    <i class=\"fa-regular fa-pen-to-square editListBtn\"></i>\n    </div>\n    <div class=\"boardContainer__main__column__list__card--addCard\">\n      <textarea maxlength=\"30\" class=\"newCardTextArea\" cols=\"30\" rows=\"3\"></textarea>\n      <button class=\"newCardBtn\">New Card</button>\n    </div>\n  ";
    listContainer.appendChild(header);
    column.appendChild(listContainer);
    var dropZones = document.querySelectorAll(".boardContainer__main__column");
    dropZones.forEach(function (dropZone) {
        dropZone.addEventListener("dragover", function (e) {
            e.preventDefault();
            dropZone.classList.add("dragover");
        });
        dropZone.addEventListener("dragenter", function (e) {
            e.preventDefault();
            dropZone.classList.add("dragover");
        });
        dropZone.addEventListener("dragleave", function (e) {
            dropZone.classList.remove("dragover");
        });
        dropZone.addEventListener("drop", function (e) {
            var _a;
            e.preventDefault();
            var draggedItemId = e.dataTransfer.getData("text/plain");
            if (!draggedItemId) {
                return;
            }
            var draggedItem = document.getElementById(draggedItemId);
            (_a = draggedItem === null || draggedItem === void 0 ? void 0 : draggedItem.parentElement) === null || _a === void 0 ? void 0 : _a.appendChild(dropZone.firstElementChild);
            dropZone.appendChild(draggedItem);
            dropZone.classList.remove("dragover");
        });
    });
    return column;
}
var cardMovement = function () {
    var grabCard = document.querySelectorAll(".boardContainer__main__column__list__card");
    var drappables = document.querySelectorAll(".boardContainer__main__column__list");
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
        var els = zone.querySelectorAll(".boardContainer__main__column__list__card:not(.is-dragging)");
        var closestTask;
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
};
function createNewCard(cardName, list) {
    var card = document.createElement("div");
    card.classList.add("boardContainer__main__column__list__card");
    card.setAttribute("draggable", "true");
    card.innerHTML = "\n  <p>" + cardName + "</p>\n  <i class=\"fa-regular fa-pen-to-square editCardBtn\"></i>\n  ";
    card.addEventListener("dragstart", cardMovement);
    // saveCardToList()
    var cardTitle = list.querySelector(".boardContainer__main__column__list__header");
    list.insertBefore(card, cardTitle.nextSibling);
    // saveCardTolocalStorage(card, currentBoard) // not working still
    card.addEventListener("dragstart", cardMovement);
}
//contenteditable function for editing name
