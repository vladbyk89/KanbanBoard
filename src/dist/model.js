var currentUser = currentUserFromStorage();
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
    function List(name, items) {
        this.name = name;
        this.items = items;
    }
    return List;
}());
var preMadeList = [
    new User("Vladislav", "Bykanov", "male", "vladb89", "12345678", "vladi@gmail.com", "0548155232"),
    new User("Itai", "Gelberg", "male", "itaiG", "abcdefgh", "itaiGel@gmail.com", "0541234567"),
    new User("Itay", "Amosi", "male", "itayA", "144322", "itaiAmosi@gmail.com", "0540987654"),
];
localStorage.setItem("signedUpUsers", JSON.stringify(preMadeList));
