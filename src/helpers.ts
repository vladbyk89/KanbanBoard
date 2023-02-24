function checkIfCurrentUserExists() {
  try {
    if (!localStorage.getItem("currentUser")) {
      window.location.href = "entryPage.html";
    }
  } catch (error) {
    console.log(error);
  }
}

const findBoard = (input: string, arr: Board[]): Board[] | false => {
  try {
    const filteredByString = arr.filter((ele) =>
      ele.name.toLowerCase().includes(input)
    );
    return filteredByString;
  } catch (error) {
    console.log(error);
    return false;
  }
};

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
