// if user is in entryPage.html run this
if (window.location.pathname.endsWith("entryPage.html")) {
    signUpPanelBtn.addEventListener("click", function () {
        entryPageMainContainer.classList.add("active");
    });
    signInPanelBtn.addEventListener("click", function () {
        entryPageMainContainer.classList.remove("active");
    });
    signUpForm.addEventListener("submit", handleSignUp);
    signInForm.addEventListener("submit", handleSignIn);
    signInForm.addEventListener("keydown", function (e) {
        if (e.key == "Enter") {
            if (userNameInput.value === "" || passwordInput.value === "") {
                return;
            }
            handleSignIn(e);
        }
    });
}
// ---------------------- index.html ----------------------
if (window.location.pathname.endsWith("index.html")) {
    renderBoardsToMain(currentUser.boardList);
    createBoardWindowBtn.addEventListener("click", function () { return (newBoardWindow.style.display = "flex"); });
    cancelCreateBoardBtn.addEventListener("click", function () { return (newBoardWindow.style.display = "none"); });
    boardImageBtn.addEventListener("click", function () {
        backgroundImageSelectionDiv.style.display = "grid";
        var backgroundImages = document.querySelectorAll(".backgroundImage");
        backgroundImages.forEach(function (img) {
            img.addEventListener("click", function () {
                imageDisplayedInCreate.src = img.src;
                backgroundImageSelectionDiv.style.display = "none";
            });
        });
    });
    createBoardBtn.addEventListener("click", createBoard);
    searchBar.addEventListener("keyup", function () {
        if (searchBar.value != "") {
            boardArea.innerHTML = "";
            var listToDisplay = currentUser.boardList.filter(function (ele) {
                return ele.name.toLowerCase().includes(searchBar.value);
            });
            if (listToDisplay) {
                renderBoardsToMain(listToDisplay);
            }
        }
        else {
            renderBoardsToMain(currentUser.boardList);
        }
    });
    boardArea.addEventListener("click", function (e) {
        var target = e.target;
        if (target.dataset.name) {
            var check = confirm("Are you sure you want to delete?");
            if (check)
                deleteBoard(target.dataset.name);
            renderBoardsToMain(currentUser.boardList);
        }
        if (target.classList.contains("boardClick")) {
            setCurrentBoard(target.innerHTML);
            window.location.href = "board.html";
        }
    });
}
//---------------------- board.html ----------------------
if (window.location.pathname.endsWith("board.html")) {
    renderBoardInBoardPage();
    addListBtn.addEventListener("click", createList);
    editBoardBtn.addEventListener("click", function () {
        editBoard(currentBoard);
        editBoardWindow.style.display = "none";
    });
    updatedBoardImageBtn.addEventListener("click", function () {
        console.log("click");
        backgroundImageSelectionDiv.style.display = "grid";
        var backgroundImages = document.querySelectorAll(".backgroundImage");
        backgroundImages.forEach(function (img) {
            img.addEventListener("click", function () {
                imageDisplayedInEdit.src = img.src;
                backgroundImageSelectionDiv.style.display = "none";
            });
        });
    });
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
            boardContainer.insertBefore(curList, deleteBoxDiv);
        }
        else {
            boardContainer.insertBefore(curList, leftList);
        }
        updateCurrentBoard();
    });
    window.addEventListener("click", function (e) {
        var target = e.target;
        if (target.className === "newCardBtn") {
            var listElement = target.closest(".boardContainer__main__list");
            var newCardTextArea = listElement.querySelector(".newCardTextArea");
            if (newCardTextArea.value == "")
                return;
            createCardElement(newCardTextArea.value, listElement);
            newCardTextArea.value = "";
        }
        if (target.classList.contains("cancelEditBoardBtn")) {
            editBoardWindow.style.display = "none";
        }
        if (target.classList.contains("editListBtn")) {
            console.log("Edit List btn is clicked");
        }
        if (target.classList.contains("editCardBtn")) {
            console.log("Edit Card btn is clicked");
        }
    });
    boardContainer.addEventListener("keyup", function () {
        updateCurrentBoard();
    });
    newListInput.addEventListener("keyup", function (event) {
        if (event.key === 'Enter') {
            createList();
        }
    });
    trashCan.addEventListener("drop", function (event) {
        var _a;
        event.preventDefault();
        var confirmDelete = confirm("Are you sure you want to delete?");
        if (confirmDelete) {
            var element = document.getElementById(event.dataTransfer.getData("Text"));
            (_a = element === null || element === void 0 ? void 0 : element.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(element);
            updateCurrentBoard();
        }
    });
}
