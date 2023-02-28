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
// if user is in index.html run this
if (window.location.pathname.endsWith("index.html")) {
    renderBoardsToMain(currentUser.boardList);
    createBoardWindowBtn.addEventListener("click", function () { return (newBoardWindow.style.display = "flex"); });
    cancelCreateBoardBtn.addEventListener("click", function () { return (newBoardWindow.style.display = "none"); });
    createBoardBtn.addEventListener("click", createBoard);
    searchBar.addEventListener("keyup", function () {
        if (searchBar.value != "") {
            boardArea.innerHTML = "";
            var listToDisplay = currentUser.boardList.filter(function (ele) { return ele.name.toLowerCase().includes(searchBar.value); });
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
        if (target.dataset.name)
            deleteBoard(target.dataset.name);
        renderBoardsToMain(currentUser.boardList);
        if (target.classList.contains("boardClick")) {
            setCurrentBoard(target.innerHTML);
            window.location.href = "board.html";
        }
    });
}
// if user is in board.html run this
if (window.location.pathname.endsWith("board.html")) {
    renderBoardInBoardPage();
    addListBtn.addEventListener("click", createList);
    editBoardBtn.addEventListener("click", function () {
        editBoard(currentBoard);
        editBoardWindow.style.display = "none";
    });
    window.addEventListener("click", function (e) {
        var target = e.target;
        if (target.className === "newCardBtn") {
            var listElement = target.closest(".boardContainer__main__list");
            var newCardTextArea = listElement.querySelector(".newCardTextArea");
            if (newCardTextArea.value == "")
                return;
            createNewCard(newCardTextArea.value, listElement);
            saveCardTolocalStorage(newCardTextArea.value, listElement.id);
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
}
