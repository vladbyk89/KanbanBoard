function checkIfCurrentUserExists() {
    try {
        if (!localStorage.getItem("currentUser")) {
            window.location.href = "entryPage.html";
        }
    }
    catch (error) {
        console.log(error);
    }
}
var findBoard = function (input, arr) {
    try {
        var filteredByString = arr.filter(function (ele) {
            return ele.name.toLowerCase().includes(input);
        });
        return filteredByString;
    }
    catch (error) {
        console.log(error);
        return false;
    }
};
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
    try {
        var getCardLocalStorage = localStorage.getItem("currentBoard");
        if (getCardLocalStorage)
            return JSON.parse(getCardLocalStorage);
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
function setCurrentBoard(boardName) {
    try {
        var findBoard_1 = currentUser.boardList.find(function (board) { return board.name === boardName; });
        localStorage.setItem("currentBoard", JSON.stringify(findBoard_1));
    }
    catch (error) {
        console.log(error);
    }
}
