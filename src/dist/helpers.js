var insertLeftOfLisk = function (zone, mouseX) {
    var staticLists = zone.querySelectorAll(".boardContainer__main__list:not(.is-dragging)");
    var closestTask = null;
    var closestOffset = Number.NEGATIVE_INFINITY;
    staticLists.forEach(function (list) {
        var cardBoundaries = list.getBoundingClientRect();
        var offset = mouseX - cardBoundaries.left - cardBoundaries.width / 2;
        if (offset < 0 && offset > closestOffset) {
            closestOffset = offset;
            closestTask = list;
        }
    });
    return closestTask;
};
var insertAboveTask = function (zone, mouseY) {
    var staticCards = zone.querySelectorAll(".boardContainer__main__list__card:not(.is-dragging)");
    var closestTask = null;
    var closestOffset = Number.NEGATIVE_INFINITY;
    staticCards.forEach(function (card) {
        var cardBoundaries = card.getBoundingClientRect();
        var offset = mouseY - cardBoundaries.top - cardBoundaries.height / 2;
        if (offset < 0 && offset > closestOffset) {
            closestOffset = offset;
            closestTask = card;
        }
    });
    return closestTask;
};
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
function setCurrentUser(userName) {
    try {
        var getLocalStorage = localStorage.getItem("signedUpUsers");
        if (getLocalStorage) {
            var usersList = JSON.parse(getLocalStorage);
            var findUser = usersList.find(function (user) { return user.userName === userName; });
            if (findUser) {
                currentUser = findUser;
                localStorage.setItem("currentUser", JSON.stringify(findUser));
            }
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
function uid() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
