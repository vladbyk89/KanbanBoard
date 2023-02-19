function displayUser(user: User) {
  if (user) {
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
  profileWindow.style.display = "flex";
  return (profileDiv.innerHTML = `
    <ul>
      <h1>About you</h1>
      <li>Name: EMPTY</li>
      <li>Gender: EMPTY</li>
      <li>Email: EMPTY</li>
      <li>Phone Number: EMPTY</li>
      <li>User Name: EMPTY</li>
      <li>Password: EMPTY</li>
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
    if (addBoardToThisUser) {
      addBoardToThisUser.boardList.push(board);
      currentUser.boardList.unshift(board);
    }
    localStorage.setItem("signedUpUsers", JSON.stringify(usersList));
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
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

function checkIfUserExists(userName: string, password: string) {
  try {
    const getLocalStorage = localStorage.getItem("signedUpUsers");
    if (getLocalStorage) {
      const userListFromStorage: User[] = JSON.parse(getLocalStorage);
      return userListFromStorage.find(
        (user) => user.userName === userName && user.password === password
      );
    }
    return false;
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

function renderBoardsToMain(listOFBoards: Board[]) {
  try {
    boardArea.innerHTML = "";
    listOFBoards.forEach((board) => {
      boardArea.innerHTML += `
      <div class='board' 
      style='background-color: ${board.backgroundColor}'>
      <h2 class="boardClick">${board.name}</h2>
      <button class="removeBoard" data-name="${board.name}">DELETE</button>
      </div>
      `;
    });
  } catch (error) {
    console.log(error);
  }
}

function createBoard() {
  try {
    if (boardName.value && boardColor.value) {
      if (!currentUser) return alert("not signed in");
      const newBoard = new Board(boardName.value, boardColor.value);
      addNewBoardToUserInLocalStorage(currentUser, newBoard);
      // location.href = "board.html";
      boardName.value = "";
      boardColor.value = "";
      newBoardWindow.style.display = "none";
      renderBoardsToMain(currentUser.boardList);
    } else {
      alert("missing field");
    }
  } catch (error) {
    console.log(error);
  }
}

function returnBoard(boardName: string) {
  const findBoard = currentUser.boardList.find(
    (board) => board.name === boardName
  );
  if (findBoard) {
    return findBoard;
  }
  return false;
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

function renderBoardInBoardPage() {
  try {
    currentBoard = currentBoardFromStorage();
    boardTitle.textContent = currentBoard.name;
    boardPage.style.backgroundColor = currentBoard.backgroundColor;
  } catch (error) {
    console.log(error);
  }
}

function deleteBoard(boardName: string) {
  const boardIndex = currentUser.boardList.findIndex(
    (board) => board.name === boardName
  );
  currentUser.boardList.splice(boardIndex, 1);
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
}
