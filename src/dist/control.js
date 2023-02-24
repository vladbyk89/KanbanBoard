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
function updateUserBoardList(updatedUser, updatedBoard) {
    if (userList) {
        var findUser_1 = userList.find(function (user) { return user.getuid === updatedUser.getuid; });
        if (findUser_1) {
            var findBoard = findUser_1.boardList.find(function (board) { return board.getuid === updatedBoard.getuid; });
            if (findBoard) {
                var boardIndex = findUser_1.boardList.indexOf(findBoard);
                // const indexCurrentUser = currentUser.boardList.indexOf(findBoard);
                findUser_1.boardList[boardIndex] = updatedBoard;
                currentUser.boardList[boardIndex] = updatedBoard;
            }
            else {
                findUser_1.boardList.unshift(updatedBoard);
                currentUser.boardList.unshift(updatedBoard);
            }
        }
        localStorage.setItem("signedUpUsers", JSON.stringify(userList));
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
}
function findUser(userName) {
    var getLocalStorage = localStorage.getItem("signedUpUsers");
    if (getLocalStorage) {
        var usersList = JSON.parse(getLocalStorage);
        var findUser_2 = usersList.find(function (user) { return user.userName === userName; });
        if (findUser_2)
            return findUser_2;
        return false;
    }
}
function checkIfUserExists(userName, password) {
    try {
        return userList.find(function (user) { return user.userName === userName && user.password === password; });
    }
    catch (error) {
        console.log(error);
    }
}
function renderBoardsToMain(listOFBoards) {
    try {
        boardArea.innerHTML = listOFBoards
            .map(function (board) {
            return "\n      <div class='board' \n      style='background-color: " + board.backgroundColor + "'>\n      <p class=\"boardClick\">" + board.name + "</p>\n      <button class=\"removeBoard\" data-name=\"" + board.name + "\">DELETE</button>\n      </div>\n      ";
        })
            .join("");
    }
    catch (error) {
        console.log(error);
    }
}
function createBoard() {
    try {
        var boardName_1 = newBoardName.value;
        var boardColor = newnBoardColor.value;
        if (boardName_1 && boardColor) {
            if (currentUser.boardList.find(function (board) { return board.name === boardName_1; }))
                return alert("There is already a board with that name");
            var newBoard = new Board(boardName_1, boardColor);
            updateUserBoardList(currentUser, newBoard);
            localStorage.setItem("currentBoard", JSON.stringify(newBoard));
            location.href = "board.html";
            boardName_1 = "";
            boardColor = "";
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
function renderBoardInBoardPage() {
    try {
        // currentBoard = currentBoardFromStorage();
        boardTitleNew.textContent = currentBoard.name;
        boardPageNew.style.backgroundColor = currentBoard.backgroundColor;
        renderLists();
    }
    catch (error) {
        console.log(error);
    }
}
function renderLists() {
    currentBoard.lists.forEach(function (list) {
        var columnElement = createNewColumn(list);
        var ListElement = columnElement.querySelector(".boardContainer__main__column__list");
        list.cards.forEach(function (card) {
            createNewCard(card, ListElement);
        });
        mainContaier.append(columnElement);
    });
}
function saveListTolocalStorage(list) {
    var _a;
    currentBoard.lists.push(list);
    localStorage.setItem("currentBoard", JSON.stringify(currentBoard));
    var boardToUpdate = currentUser.boardList.find(function (board) { return board.name == currentBoard.name; });
    boardToUpdate.lists.push(list);
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    var signedUpUsers = JSON.parse(localStorage.getItem("signedUpUsers") || "[]");
    for (var _i = 0, signedUpUsers_1 = signedUpUsers; _i < signedUpUsers_1.length; _i++) {
        var user = signedUpUsers_1[_i];
        if (user.userName === currentUser.userName) {
            (_a = user.boardList
                .find(function (board) { return board.name === currentBoard.name; })) === null || _a === void 0 ? void 0 : _a.lists.push(list);
            localStorage.setItem("signedUpUsers", JSON.stringify(signedUpUsers));
        }
    }
}
// card => list
// list => currentBoard
// currentBoard => currentUser
// currentUser => signedUpUsers
function saveCardTolocalStorage(cardName, listName) {
    var listToUpDate = currentBoard.lists.find(function (list) { return list.name == listName; });
    listToUpDate.cards.push(cardName);
    localStorage.setItem("currentBoard", JSON.stringify(currentBoard));
    var boardToUpdate = currentUser.boardList.find(function (board) { return board.name == currentBoard.name; });
    boardToUpdate.lists = currentBoard.lists;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
}
// delete from local storage
function deleteBoard(boardName) {
    var boardIndex = currentUser.boardList.findIndex(function (board) { return board.name === boardName; });
    currentUser.boardList.splice(boardIndex, 1);
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    var findUser = userList.find(function (user) { return user.getuid === currentUser.getuid; });
    if (findUser)
        findUser.boardList.splice(boardIndex, 1);
    localStorage.setItem("signedUpUsers", JSON.stringify(userList));
}
