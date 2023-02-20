var mainContaier = document.querySelector(".boardContainer__main");
var addListBtn = document.querySelector("#addListBtn");
var newListInput = document.querySelector("#newListInput");
var newCardButtons = document.querySelectorAll(".newCardBtn");
window.addEventListener("click", function (e) {
    var _a;
    var target = e.target;
    if (target.className === "newCardBtn") {
        var listElement = target.closest(".boardContainer__main__column__list");
        console.log(listElement);
        var listHeader = document.querySelector(".boardContainer__main__column__list__header");
        console.log(listHeader);
        var newCardName = (_a = target.parentNode) === null || _a === void 0 ? void 0 : _a.querySelector(".newCardTextArea");
        createNewCard(newCardName.value, listElement);
    }
});
addListBtn.addEventListener("click", function () {
    console.log(newListInput.value);
    createNewColumn(newListInput.value);
});
function createNewColumn(listName) {
    var column = document.createElement("div");
    column.classList.add("boardContainer__main__column");
    column.innerHTML = "\n  <div class=\"boardContainer__main__column__list\" draggable=\"true\">\n  <div class=\"boardContainer__main__column__list__header\">\n    <h2>" + listName + "</h2>\n\n  </div>\n    <div\n      class=\"boardContainer__main__column__list__card\"\n      draggable=\"true\"\n    >\n      <p>Task 2</p>\n      <i class=\"fa-regular fa-pen-to-square p1\"></i>\n    </div>\n    <div\n      class=\"boardContainer__main__column__list__card\"\n      draggable=\"true\"\n    >\n      <p>Long Text task to test look</p>\n      <i class=\"fa-regular fa-pen-to-square p1\"></i>\n    </div>\n    <div class=\"boardContainer__main__column__list__card--addCard\">\n      <textarea maxlength=\"30\" class=\"newCardTextArea\" cols=\"30\" rows=\"3\"></textarea>\n      <button class=\"newCardBtn\">New Card</button>\n    </div>\n  </div>";
    mainContaier.append(column);
}
function createNewCard(cardName, list) {
    var card = document.createElement("div");
    card.classList.add("boardContainer__main__column__list__card");
    card.setAttribute("draggable", "true");
    card.innerHTML = "\n  <p>" + cardName + "</p>\n  <i class=\"fa-regular fa-pen-to-square p1\"></i>\n  ";
    //   list.insertBefore(listHeader, card);
}
