function displayUser(user) {
    profileWindow.style.display = "flex";
    return (profileDiv.innerHTML = "\n      <ul>\n        <h1>About you</h1>\n        <li>Name: " + user.firstName + " " + user.lastName + "</li>\n        <li>Gender: " + user.gender + "</li>\n        <li>Email: " + user.email + "</li>\n        <li>Phone Number: " + user.phoneNumber + "</li>\n        <li>User Name: " + user.userName + "</li>\n        <li>Password: " + user.password + "</li>\n      </ul>\n      ");
}
function addNewBoardToUserInLocalStorage(updatedUser, board) {
    var getLocalStorage = localStorage.getItem("signedUpUsers");
    if (getLocalStorage) {
        var usersList = JSON.parse(getLocalStorage);
        var addBoardToThisUser = usersList.find(function (user) { return user.userName === updatedUser.userName; });
        if (addBoardToThisUser)
            addBoardToThisUser.boardList.push(board);
        localStorage.setItem('signedUpUsers', JSON.stringify(usersList));
        console.log(addBoardToThisUser);
    }
}
