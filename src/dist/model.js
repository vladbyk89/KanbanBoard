var _a, _b, _c, _d;
var userList = userListFromStorage();
var cards = document.querySelectorAll(".boardContainer__main__list__card");
var User = /** @class */ (function () {
    function User(firstName, lastName, gender, userName, password, email, phoneNumber, boardList, uid) {
        if (boardList === void 0) { boardList = []; }
        if (uid === void 0) { uid = Math.random().toString(36).slice(2); }
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.userName = userName;
        this.password = password;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.boardList = boardList;
        this.uid = uid;
    }
    User.currentUserFromStorage = function () {
        try {
            var getUser = localStorage.getItem("currentUser");
            if (getUser) {
                var obj = JSON.parse(getUser);
                currentUser = new User(obj.firstName, obj.lastName, obj.gender, obj.userName, obj.password, obj.email, obj.phoneNumber, obj.boardList, obj.uid);
            }
        }
        catch (error) {
            console.log(error);
        }
    };
    User.setCurrentUser = function (userName) {
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
    };
    return User;
}());
var currentUser;
User.currentUserFromStorage();
var Board = /** @class */ (function () {
    function Board(name, backgroundImage, lists, uid) {
        if (lists === void 0) { lists = []; }
        if (uid === void 0) { uid = Math.random().toString(36).slice(2); }
        this.name = name;
        this.backgroundImage = backgroundImage;
        this.lists = lists;
        this.uid = uid;
    }
    Board.getCurrentBoardFromStorage = function () {
        try {
            var getBoard = localStorage.getItem("currentBoard");
            if (getBoard) {
                var obj = JSON.parse(getBoard);
                currentBoard = new Board(obj.name, obj.backgroundImage, obj.lists, obj.uid);
            }
        }
        catch (error) {
            console.log(error);
        }
    };
    Board.setCurrentBoard = function (boardName) {
        try {
            var findBoard = currentUser.boardList.find(function (board) { return board.name === boardName; });
            localStorage.setItem("currentBoard", JSON.stringify(findBoard));
        }
        catch (error) {
            console.log(error);
        }
    };
    Board.prototype.update = function () {
        var _this = this;
        this.lists = [];
        var listElements = boardContainer.querySelectorAll(".boardContainer__main__list");
        listElements.forEach(function (list) {
            var _a;
            var listName = (_a = list.querySelector("h2")) === null || _a === void 0 ? void 0 : _a.innerHTML;
            var cardsArr = [];
            list
                .querySelectorAll("p")
                .forEach(function (card) { return cardsArr.push(card.innerHTML); });
            var newList = new List(listName, Array.from(cardsArr));
            _this.lists.push(newList);
        });
        localStorage.setItem("currentBoard", JSON.stringify(this));
        updateUserBoardList(currentUser, this);
    };
    Board.prototype.edit = function (newName, imageSrc) {
        this.name = newName;
        this.backgroundImage = imageSrc;
        localStorage.setItem("currentBoard", JSON.stringify(this));
        boardTitle.textContent = newName;
        boardContainer.style.background = "url(" + imageSrc + ") no-repeat center / cover";
        updateUserBoardList(currentUser, this);
    };
    return Board;
}());
var currentBoard;
Board.getCurrentBoardFromStorage();
var List = /** @class */ (function () {
    function List(name, cards, uid, position) {
        if (cards === void 0) { cards = []; }
        if (uid === void 0) { uid = Math.random().toString(36).slice(2); }
        if (position === void 0) { position = position; }
        this.name = name;
        this.cards = cards;
        this.uid = uid;
        this.position = position;
    }
    return List;
}());
var preMadeUserList = [
    new User("Vladislav", "Bykanov", "male", "vladb89", "12345678", "vladi@gmail.com", "0548155232"),
    new User("Itai", "Gelberg", "male", "itaiG", "12345", "itaiGel@gmail.com", "0541234567"),
    new User("Itay", "Amosi", "male", "itayz1e", "144322", "itayAmosi@gmail.com", "0540987654"),
];
var preMadeBoardList = [
    new Board("Golden Board", "./img/NASA.jpg"),
    new Board("Cyan Board", "./img/pink-sea.jpg"),
    new Board("Magenta Board", "./img/purple-flower.jpg"),
    new Board("Salmon Board", "./img/sea.jpg"),
    new Board("SlateBlue Board", "./img/wall-painting.jpg"),
];
var preMadeListList = [
    new List("To Do", ["buy chocolate", "write a song", "go for a jog"]),
    new List("Design", ["Design html page", "Create logo"]),
    new List("Backlog", ["Register", "Accessibility", "CRUD Lists", "Login"]),
    new List("Finish", [
        "open repo",
        "Create Main Page",
        "Create Login Page",
        "Create Sign Up page",
    ]),
];
if (!localStorage.getItem("signedUpUsers")) {
    (_a = preMadeBoardList[0].lists).push.apply(_a, preMadeListList);
    (_b = preMadeUserList[0].boardList).push.apply(_b, preMadeBoardList);
    (_c = preMadeUserList[1].boardList).push.apply(_c, preMadeBoardList);
    (_d = preMadeUserList[2].boardList).push.apply(_d, preMadeBoardList);
    localStorage.setItem("signedUpUsers", JSON.stringify(preMadeUserList));
}
// let currentBoard: Board = currentBoardFromStorage();
// function currentBoardFromStorage(): Board {
//   try {
//     const getBoard = localStorage.getItem("currentBoard");
//     if (getBoard) {
//       const obj = JSON.parse(getBoard);
//       const board = new Board(obj.name, obj.backgroundImage, obj.lists, obj.uid)
//       console.log(board);
//       console.log(JSON.parse(getBoard));
//       return board;
//     }
//     const fakeBoard: Board = new Board('empty', 'empty');
//     return fakeBoard
//   } catch (error) {
//     console.log(error);
//     const fakeBoard: Board = new Board('empty', 'empty');
//     return fakeBoard
//   }
// }
