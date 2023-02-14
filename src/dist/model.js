var User = /** @class */ (function () {
    function User(firstName, lastName, gender, userName, password, email, phoneNumber) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.userName = userName;
        this.password = password;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.uid = Math.random().toString(36).slice(2);
    }
    User.prototype.getuid = function () {
        return this.uid;
    };
    return User;
}());
var preMadeList = [
    new User("vladi", "bykanov", "male", "vladb89", "12345678", "vladi@gmail.com", "0548155232"),
    new User("itai", "Gelberg", "male", "itaiG", "abcdefgh", "itaiGel@gmail.com", "0541234567"),
    new User("itai", "Amosi", "male", "itaiA", "87654321", "itaiAmosi@gmail.com", "0540987654"),
];
localStorage.setItem('signedUpUsers', JSON.stringify(preMadeList));
