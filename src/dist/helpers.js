function checkIfUserIsSignedIn() {
    try {
        if (!localStorage.getItem("currentUser")) {
            window.location.href = "entryPage.html";
        }
    }
    catch (error) {
        console.log(error);
    }
}
function userListFromStorage() {
    var getLocalStorage = localStorage.getItem("signedUpUsers");
    if (getLocalStorage) {
        var userList = JSON.parse(getLocalStorage);
        return userList;
    }
    return [];
}
function currentUserFromStorage() {
    try {
        var getUser = localStorage.getItem("currentUser");
        if (getUser)
            return JSON.parse(getUser);
    }
    catch (error) {
        console.log(error);
    }
}
function currentBoardFromStorage() {
    try {
        var getBoard = localStorage.getItem("currentBoard");
        if (getBoard)
            return JSON.parse(getBoard);
    }
    catch (error) {
        console.log(error);
    }
}
function userCardFromStorage() {
    //for getting the user cards from local storege
    try {
        var getCardLocalStorage = localStorage.getItem("currentBoard");
        if (getCardLocalStorage)
            return JSON.parse(getCardLocalStorage);
    }
    catch (error) {
        console.log(error);
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
function setCurrentBoard(boardName) {
    try {
        var findBoard = currentUser.boardList.find(function (board) { return board.name === boardName; });
        localStorage.setItem("currentBoard", JSON.stringify(findBoard));
    }
    catch (error) {
        console.log(error);
    }
}
