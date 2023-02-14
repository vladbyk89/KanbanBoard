registerButton.addEventListener("click", function (e) {
    e.preventDefault();
    var user = new User(firstName.value, lastName.value, gender.value, userName.value, password.value, email.value, phoneNumber.value);
    var signedUpUsers = JSON.parse(localStorage.getItem('signedUpUsers') || '[]');
    signedUpUsers.push(user);
    localStorage.setItem('signedUpUsers', JSON.stringify(signedUpUsers));
    // location.href='index.html';
    console.table(signedUpUsers);
});
