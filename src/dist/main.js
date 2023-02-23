userList = userListFromStorage();
if (window.location.pathname.endsWith("entryPage.html")) {
    signUpPanelBtn.addEventListener("click", function () {
        mainContainer.classList.add("active");
    });
    signInPanelBtn.addEventListener("click", function () {
        mainContainer.classList.remove("active");
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
// if user is in index.html run this
if (window.location.pathname.endsWith("index.html")) {
    renderBoardsToMain(currentUser.boardList);
    createBoardWindowBtn.addEventListener("click", function () { return (newBoardWindow.style.display = "flex"); });
    cancelCreateBoardBtn.addEventListener("click", function () { return (newBoardWindow.style.display = "none"); });
    createBoardBtn.addEventListener("click", createBoard);
    searchBar.addEventListener("keyup", function () {
        if (searchBar.value != "") {
            boardArea.innerHTML = "";
            var listToDisplay = findBoard(searchBar.value, currentUser.boardList);
            if (listToDisplay !== false) {
                renderBoardsToMain(listToDisplay);
            }
        }
        else {
            renderBoardsToMain(currentUser.boardList);
        }
    });
    boardArea.addEventListener("click", function (e) {
        var target = e.target;
        if (target.dataset.name)
            deleteBoard(target.dataset.name);
        renderBoardsToMain(currentUser.boardList);
        if (target.classList.contains("boardClick")) {
            setCurrentBoard(target.innerHTML);
            window.location.href = "NewBoard.html";
        }
    });
}
// if user is in NewBoard.html run this
if (window.location.pathname.endsWith("NewBoard.html")) {
    renderBoardInBoardPage();
    addListBtn.addEventListener("click", function () {
        var newList = new List(newListInput.value);
        mainContaier.append(createNewColumn(newList));
    });
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
}
