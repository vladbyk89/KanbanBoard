function displayUser(user) {
    if (user) {
        profileWindow.style.display = "flex";
        return (profileDiv.innerHTML = "\n      <ul>\n        <h1>About you</h1>\n        <li>Name: " + user.firstName + " " + user.lastName + "</li>\n        <li>Gender: " + user.gender + "</li>\n        <li>Email: " + user.email + "</li>\n        <li>Phone Number: " + user.phoneNumber + "</li>\n        <li>User Name: " + user.userName + "</li>\n        <li>Password: " + user.password + "</li>\n      </ul>\n      ");
    }
    profileWindow.style.display = "flex";
    return (profileDiv.innerHTML = "\n    <ul>\n      <h1>About you</h1>\n      <li>Name: EMPTY</li>\n      <li>Gender: EMPTY</li>\n      <li>Email: EMPTY</li>\n      <li>Phone Number: EMPTY</li>\n      <li>User Name: EMPTY</li>\n      <li>Password: EMPTY</li>\n    </ul>\n    ");
}
function addNewBoardToUserInLocalStorage(updatedUser, board) {
    var getLocalStorage = localStorage.getItem("signedUpUsers");
    if (getLocalStorage) {
        var usersList = JSON.parse(getLocalStorage);
        var addBoardToThisUser = usersList.find(function (user) { return user.userName === updatedUser.userName; });
        if (addBoardToThisUser) {
            addBoardToThisUser.boardList.push(board);
            currentUser.boardList.push(board);
        }
        localStorage.setItem("signedUpUsers", JSON.stringify(usersList));
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        console.log(addBoardToThisUser);
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
    if (findUser(userName)) {
        currentUser = findUser(userName);
        localStorage.setItem("currentUser", JSON.stringify(findUser(userName)));
    }
}
function currentUserFromStorage() {
    var getUser = localStorage.getItem("currentUser");
    if (getUser)
        return JSON.parse(getUser);
}
function renderBoardsToMain(listOFBoards) {
    boardArea.innerHTML = "";
    listOFBoards.forEach(function (board) {
        boardArea.innerHTML += "\n    <div class='board' \n    style='background-color: " + board.backgroundColor + "'>\n    <h2>" + board.name + "</h2>\n    </div>\n    ";
    });
}
function createBoard() {
    console.log("createBoard() running");
    if (boardName.value && boardColor.value) {
        if (!currentUser)
            return alert("not signed in");
        var newBoard = new Board(boardName.value, boardColor.value);
        addNewBoardToUserInLocalStorage(currentUser, newBoard);
        // location.href = "board.html";
        boardName.value = "";
        boardColor.value = "";
        newBoardWindow.style.display = "none";
        renderBoardsToMain(currentUser.boardList);
        console.table(preMadeUserList);
    }
    else {
        alert("missing field");
    }
}
