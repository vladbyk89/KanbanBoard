function checkIfUserIsSignedIn() {
  try {
    if (!localStorage.getItem("currentUser")) {
      window.location.href = "entryPage.html";
    }
  } catch (error) {
    console.log(error);
  }
}

function userListFromStorage() {
  const getLocalStorage = localStorage.getItem("signedUpUsers");
  if (getLocalStorage) {
    const userList: User[] = JSON.parse(getLocalStorage);
    return userList;
  }
  return [];
}

function currentUserFromStorage() {
  try {
    const getUser = localStorage.getItem("currentUser");
    if (getUser) return JSON.parse(getUser);
  } catch (error) {
    console.log(error);
  }
}

function currentBoardFromStorage() {
  try {
    const getBoard = localStorage.getItem("currentBoard");
    if (getBoard) return JSON.parse(getBoard);
  } catch (error) {
    console.log(error);
  }
}

function userCardFromStorage() {
  //for getting the user cards from local storege
  try {
    const getCardLocalStorage = localStorage.getItem("currentBoard");
    if (getCardLocalStorage) return JSON.parse(getCardLocalStorage);
  } catch (error) {
    console.log(error);
  }
}

function findUser(userName: string) {
  const getLocalStorage = localStorage.getItem("signedUpUsers");
  if (getLocalStorage) {
    const usersList = JSON.parse(getLocalStorage) as User[];
    const findUser = usersList.find((user) => user.userName === userName);
    if (findUser) return findUser;
    return false;
  }
}

function setCurrentUser(userName: string) {
  try {
    if (findUser(userName)) {
      currentUser = findUser(userName) as User;
      localStorage.setItem("currentUser", JSON.stringify(findUser(userName)));
    }
  } catch (error) {
    console.log(error);
  }
}

function setCurrentBoard(boardName: string) {
  try {
    const findBoard = currentUser.boardList.find(
      (board) => board.name === boardName
    );
    localStorage.setItem("currentBoard", JSON.stringify(findBoard));
  } catch (error) {
    console.log(error);
  }
}
