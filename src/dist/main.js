userList = userListFromStorage();
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
if (window.location.pathname.endsWith("register.html")) {
    form.addEventListener("submit", handleFormSubmit);
}
//  index.html events
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
// Board Page
if (window.location.pathname.endsWith("NewBoard.html")) {
    renderLists();
}
// all windows event listener
window.addEventListener("click", function (e) {
    var target = e.target;
    if (target.classList.contains("profileBtn")) {
        displayProfile(currentUser);
    }
    if (target.classList.contains("signOutbtn")) {
        localStorage.removeItem("currentUser");
        window.location.href = "login.html";
    }
    if (target.classList.contains("backToMain")) {
        profileWindow.style.display = "none";
    }
});
