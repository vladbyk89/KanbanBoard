renderBoardInBoardPage();
backToMainBtn.addEventListener("click", function () {
    localStorage.removeItem("currentBoard");
    window.location.href = "index.html";
});
var mainContaier = document.querySelector(".boardContainer__mainNew");
var addListBtn = document.querySelector("#addListBtn");
var newListInput = document.querySelector("#newListInput");
var newCardButtons = document.querySelectorAll(".newCardBtn");
window.addEventListener("click", function (e) {
    var _a;
    var target = e.target;
    if (target.className === "newCardBtn") {
        var listElement = target.closest(".boardContainer__mainNew__column__list");
        var newCardTextArea = (_a = target.parentNode) === null || _a === void 0 ? void 0 : _a.querySelector(".newCardTextArea");
        createNewCard(newCardTextArea.value, listElement);
        newCardTextArea.value = "";
    }
});
addListBtn.addEventListener("click", function () {
    var newList = new List(newListInput.value);
    mainContaier.append(createNewColumn(newList));
});
function createNewColumn(list) {
    var column = document.createElement("div");
    column.classList.add("boardContainer__mainNew__column");
    column.innerHTML = "\n  <div class=\"boardContainer__mainNew__column__list\" draggable=\"true\">\n  <div class=\"boardContainer__mainNew__column__list__header\">\n    <h2>" + list.name + "</h2>\n\n  </div>\n    <div class=\"boardContainer__mainNew__column__list__card--addCard\">\n      <textarea maxlength=\"30\" class=\"newCardTextArea\" cols=\"30\" rows=\"3\"></textarea>\n      <button class=\"newCardBtn\">New Card</button>\n    </div>\n  </div>";
    return column;
}
function createNewCard(cardName, list) {
    var card = document.createElement("div");
    card.classList.add("boardContainer__mainNew__column__list__card");
    card.setAttribute("draggable", "true");
    card.innerHTML = "\n  <p>" + cardName + "</p>\n  <i class=\"fa-regular fa-pen-to-square p1\"></i>\n  ";
    var cardTitle = list.querySelector(".boardContainer__mainNew__column__list__header");
    list.insertBefore(card, cardTitle.nextSibling);
}
