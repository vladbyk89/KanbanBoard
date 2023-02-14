registerButton.addEventListener("click", (e) => {
    e.preventDefault();

    const user = new User(
        firstName.value,
        lastName.value,
        gender.value,
        userName.value,
        password.value,
        email.value,
        phoneNumber.value
    );

    const signedUpUsers = JSON.parse(localStorage.getItem('signedUpUsers') || '[]') as User[];
    signedUpUsers.push(user);
    localStorage.setItem('signedUpUsers', JSON.stringify(signedUpUsers));
    // location.href='index.html';
    console.table(signedUpUsers)
});
