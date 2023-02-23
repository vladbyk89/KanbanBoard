var _a, _b, _c, _d;
var currentUser = currentUserFromStorage();
var currentBoard = currentBoardFromStorage();
var userList;
var User = /** @class */ (function () {
    function User(firstName, lastName, gender, userName, password, email, phoneNumber, boardList) {
        if (boardList === void 0) { boardList = []; }
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.userName = userName;
        this.password = password;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.boardList = boardList;
        this.uid = Math.random().toString(36).slice(2);
    }
    User.prototype.getuid = function () {
        return this.uid;
    };
    return User;
}());
var Board = /** @class */ (function () {
    function Board(name, backgroundColor, lists) {
        if (lists === void 0) { lists = []; }
        this.name = name;
        this.backgroundColor = backgroundColor;
        this.lists = lists;
    }
    return Board;
}());
var List = /** @class */ (function () {
    function List(name, cards) {
        if (cards === void 0) { cards = []; }
        this.name = name;
        this.cards = cards;
    }
    return List;
}());
var preMadeUserList = [
    new User("Vladislav", "Bykanov", "male", "vladb89", "12345678", "vladi@gmail.com", "0548155232"),
    new User("Itai", "Gelberg", "male", "itaiG", "abcdefgh", "itaiGel@gmail.com", "0541234567"),
    new User("Itay", "Amosi", "male", "itayz1e", "144322", "itayAmosi@gmail.com", "0540987654"),
];
var preMadeBoardList = [
    new Board("Golden Board", "darkgoldenrod"),
    new Board("Cyan Board", "darkcyan"),
    new Board("Magenta Board", "darkmagenta"),
    new Board("Salmon Board", "darksalmon"),
    new Board("SlateBlue Board", "darkslateblue"),
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
