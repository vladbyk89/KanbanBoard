userList = userListFromStorage();
// if user is in login.html run this
if (window.location.pathname.endsWith("login.html")) {
    loginContainer.addEventListener("click", function (e) {
        var target = e.target;
        if (target.className === "newUserBtn") {
            window.location.href = "register.html";
        }
        if (target.className == "loginBtn") {
            if (loginUserName.value === "" || loginPassword.value === "") {
                return alert("missing input");
            }
            if (checkIfUserExists(loginUserName.value, loginPassword.value)) {
                setCurrentUser(loginUserName.value);
                loginUserName.value = "";
                loginPassword.value = "";
                window.location.href = "index.html";
            }
            else {
                alert("user not in database");
            }
        }
        window.addEventListener("keydown", function (_a) {
            var key = _a.key;
            if (key == "Enter") {
                if (loginUserName.value === "" || loginPassword.value === "") {
                    return alert("missing input");
                }
                if (checkIfUserExists(loginUserName.value, loginPassword.value)) {
                    setCurrentUser(loginUserName.value);
                    loginUserName.value = "";
                    loginPassword.value = "";
                    window.location.href = "index.html";
                }
                else {
                    alert("user not in database");
                }
            }
        });
    });
}
// if user is in register.html run this
if (window.location.pathname.endsWith("register.html")) {
    form.addEventListener("submit", handleFormSubmit);
}
// if user is in index.html run this
if (window.location.pathname.endsWith("index.html")) {
    renderBoardsToMain(currentUser.boardList);
    createBoardWindowBtn.addEventListener("click", function () { return (newBoardWindow.style.display = "flex"); });
    cancelCreateBoardBtn.addEventListener("click", function () { return (newBoardWindow.style.display = "none"); });
    createBoardBtn.addEventListener("click", createBoard);
    signOutBtn.addEventListener("click", function () {
        localStorage.removeItem("currentUser");
        window.location.href = "login.html";
    });
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
