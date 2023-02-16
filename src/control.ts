function displayUser(user: User) {
  profileWindow.style.display = "flex";
  return (profileDiv.innerHTML = `
      <ul>
        <h1>About you</h1>
        <li>Name: ${user.firstName} ${user.lastName}</li>
        <li>Gender: ${user.gender}</li>
        <li>Email: ${user.email}</li>
        <li>Phone Number: ${user.phoneNumber}</li>
        <li>User Name: ${user.userName}</li>
        <li>Password: ${user.password}</li>
      </ul>
      `);
}

function addNewBoardToUserInLocalStorage(updatedUser: User, board: Board) {
  const getLocalStorage = localStorage.getItem("signedUpUsers");
  if (getLocalStorage) {
    const usersList = JSON.parse(getLocalStorage) as User[];
    const addBoardToThisUser = usersList.find(
      (user) => user.userName === updatedUser.userName
    );
    if (addBoardToThisUser) addBoardToThisUser.boardList.push(board);
    localStorage.setItem('signedUpUsers', JSON.stringify(usersList))
    console.log(addBoardToThisUser);
  }
}
