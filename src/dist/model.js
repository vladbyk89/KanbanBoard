var _a, _b, _c, _d;
var currentUser = currentUserFromStorage();
var currentBoard = currentBoardFromStorage();
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
    return User;
}());
var Board = /** @class */ (function () {
    function Board(name, 
    // public backgroundColor: string,
    backgroundImage, lists, uid) {
        if (lists === void 0) { lists = []; }
        if (uid === void 0) { uid = Math.random().toString(36).slice(2); }
        this.name = name;
        this.backgroundImage = backgroundImage;
        this.lists = lists;
        this.uid = uid;
    }
    return Board;
}());
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
