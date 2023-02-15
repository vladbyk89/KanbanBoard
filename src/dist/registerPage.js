registerButton.addEventListener("click", function (e) {
    e.preventDefault();
    var user = new User(firstName.value, lastName.value, gender.value, userName.value, password.value, email.value, phoneNumber.value);
    var signedUpUsers = JSON.parse(localStorage.getItem('signedUpUsers') || '[]');
    signedUpUsers.push(user);
    localStorage.setItem('signedUpUsers', JSON.stringify(signedUpUsers));
    // location.href='index.html';
    console.table(signedUpUsers);
});
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
    var phone = this.elements.phone.value;
    var location = this.elements.location.value;
    var arr = [gender, firstName, lastName, password, userName, email, phone, location];
    if (arr.some(function (ele) { return ele == ''; }))
        return alert('missing field');
    var newUser = new User(firstName, lastName, gender, userName, password, email, phone);
    e.target.reset();
}
