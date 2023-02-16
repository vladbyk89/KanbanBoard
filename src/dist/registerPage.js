// Look at this function.. maybe you can use it to create new user
function handleSubmit(e) {
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
    if (arr.some(function (ele) { return ele == ""; }))
        return alert("missing field");
    var newUser = new User(firstName, lastName, gender, userName, password, email, phone);
    var signedUpUsers = JSON.parse(localStorage.getItem("signedUpUsers") || "[]");
    signedUpUsers.push(newUser);
    localStorage.setItem("signedUpUsers", JSON.stringify(signedUpUsers));
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    location.href = "index.html";
    console.table(signedUpUsers);
    e.target.reset();
}
form.addEventListener("submit", handleSubmit);
