function handleSignUp(e) {
    e.preventDefault();
    // e.stopPropagation();
    var gender = this.elements.gender.value;
    var firstName = this.elements.firstName.value;
    var lastName = this.elements.lastName.value;
    var password = this.elements.password.value;
    var userName = this.elements.userName.value;
    var email = this.elements.email.value;
    var phone = this.elements.phoneNumber.value;
    var arr = [gender, firstName, lastName, password, userName, email, phone];
    console.log(arr);
    if (arr.some(function (ele) { return ele == ""; }))
        return alert("missing field");
    var newUser = new User(firstName, lastName, gender, userName, password, email, phone);
    var signedUpUsers = JSON.parse(localStorage.getItem("signedUpUsers") || "[]");
    signedUpUsers.push(newUser);
    localStorage.setItem("signedUpUsers", JSON.stringify(signedUpUsers));
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    location.href = "index.html";
    this.reset();
}
function handleSignIn(e) {
    e.preventDefault();
    // e.stopPropagation();
    var userName = userNameInput.value;
    var password = passwordInput.value;
    if (checkIfUserExists(userName, password)) {
        setCurrentUser(userName);
        signInForm.reset();
        window.location.href = "index.html";
    }
    else {
        alert("user not in database");
    }
}
function displayProfile(user) {
    if (user) {
        profileWindow.style.display = "flex";
        return (profileDiv.innerHTML = "\n      <ul>\n        <h1>About you</h1>\n        <li>Name: " + user.firstName + " " + user.lastName + "</li>\n        <li>Gender: " + user.gender + "</li>\n        <li>Email: " + user.email + "</li>\n        <li>Phone Number: " + user.phoneNumber + "</li>\n        <li>User Name: " + user.userName + "</li>\n        <li>Password: " + user.password + "</li>\n      </ul>\n      ");
    }
    profileWindow.style.display = "flex";
    return (profileDiv.innerHTML = "\n    <ul>\n      <h1>About you</h1>\n      <li>Name: EMPTY</li>\n      <li>Gender: EMPTY</li>\n      <li>Email: EMPTY</li>\n      <li>Phone Number: EMPTY</li>\n      <li>User Name: EMPTY</li>\n      <li>Password: EMPTY</li>\n    </ul>\n    ");
}
function updateUserBoardList(updatedUser, board) {
    var getLocalStorage = localStorage.getItem("signedUpUsers");
    if (getLocalStorage) {
        var usersList = JSON.parse(getLocalStorage);
        var addBoardToThisUser = usersList.find(function (user) { return user.userName === updatedUser.userName; });
        if (addBoardToThisUser) {
            addBoardToThisUser.boardList.push(board);
            currentUser.boardList.unshift(board);
        }
        localStorage.setItem("signedUpUsers", JSON.stringify(usersList));
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
}
function findUser(userName) {
    var getLocalStorage = localStorage.getItem("signedUpUsers");
    if (getLocalStorage) {
        var usersList = JSON.parse(getLocalStorage);
        var findUser_1 = usersList.find(function (user) { return user.userName === userName; });
        if (findUser_1)
            return findUser_1;
        return false;
    }
}
function checkIfUserExists(userName, password) {
    try {
        var getLocalStorage = localStorage.getItem("signedUpUsers");
        if (getLocalStorage) {
            var userListFromStorage = JSON.parse(getLocalStorage);
            return userListFromStorage.find(function (user) { return user.userName === userName && user.password === password; });
        }
        return false;
    }
    catch (error) {
        console.log(error);
    }
}
function setCurrentUser(userName) {
    try {
        if (findUser(userName)) {
            currentUser = findUser(userName);
            localStorage.setItem("currentUser", JSON.stringify(findUser(userName)));
        }
    }
    catch (error) {
        console.log(error);
    }
}
function renderBoardsToMain(listOFBoards) {
    try {
        boardArea.innerHTML = "";
        listOFBoards.forEach(function (board) {
            boardArea.innerHTML += "\n      <div class='board' \n      style='background-color: " + board.backgroundColor + "'>\n      <h2 class=\"boardClick\">" + board.name + "</h2>\n      <button class=\"removeBoard\" data-name=\"" + board.name + "\">DELETE</button>\n      </div>\n      ";
        });
    }
    catch (error) {
        console.log(error);
    }
}
function createBoard() {
    try {
        if (boardName.value && boardColor.value) {
            if (!currentUser)
                return alert("not signed in");
            var newBoard = new Board(boardName.value, boardColor.value);
            updateUserBoardList(currentUser, newBoard);
            localStorage.setItem("currentBoard", JSON.stringify(newBoard));
            location.href = "NewBoard.html";
            boardName.value = "";
            boardColor.value = "";
            newBoardWindow.style.display = "none";
            renderBoardsToMain(currentUser.boardList);
        }
        else {
            alert("missing field");
        }
    }
    catch (error) {
        console.log(error);
    }
}
function returnBoard(boardName) {
    var findBoard = currentUser.boardList.find(function (board) { return board.name === boardName; });
    if (findBoard) {
        return findBoard;
    }
    return false;
}
function setCurrentBoard(boardName) {
    try {
        var findBoard = currentUser.boardList.find(function (board) { return board.name === boardName; });
        localStorage.setItem("currentBoard", JSON.stringify(findBoard));
    }
    catch (error) {
        console.log(error);
    }
}
function renderBoardInBoardPage() {
    try {
        currentBoard = currentBoardFromStorage();
        boardTitleNew.textContent = currentBoard.name;
        boardPageNew.style.backgroundColor = currentBoard.backgroundColor;
        renderLists();
    }
    catch (error) {
        console.log(error);
    }
}
function deleteBoard(boardName) {
    var _a;
    var boardIndex = currentUser.boardList.findIndex(function (board) { return board.name === boardName; });
    currentUser.boardList.splice(boardIndex, 1);
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    (_a = userList
        .find(function (user) { return user.userName === currentUser.userName; })) === null || _a === void 0 ? void 0 : _a.boardList.splice(boardIndex, 1);
    localStorage.setItem("signedUpUsers", JSON.stringify(userList));
}
function renderLists() {
    currentBoard.lists.forEach(function (list) {
        var columnElement = createNewColumn(list);
        var ListElement = columnElement.querySelector(".boardContainer__mainNew__column__list");
        list.cards.forEach(function (card) {
            createNewCard(card, ListElement);
            mainContaier.append(columnElement);
        });
    });
}
