function handleSignUp(e: Event) {
  e.preventDefault();
  // e.stopPropagation();
  const gender = this.elements.gender.value;
  const firstName = this.elements.firstName.value;
  const lastName = this.elements.lastName.value;
  const password = this.elements.password.value;
  const userName = this.elements.userName.value;
  const email = this.elements.email.value;
  const phone = this.elements.phoneNumber.value;
  const arr = [gender, firstName, lastName, password, userName, email, phone];
  console.log(arr);
  if (arr.some((ele) => ele == "")) return alert("missing field");
  const newUser = new User(
    firstName,
    lastName,
    gender,
    userName,
    password,
    email,
    phone
  );
  const signedUpUsers = JSON.parse(
    localStorage.getItem("signedUpUsers") || "[]"
  ) as User[];
  signedUpUsers.push(newUser);
  localStorage.setItem("signedUpUsers", JSON.stringify(signedUpUsers));
  localStorage.setItem("currentUser", JSON.stringify(newUser));
  location.href = "index.html";
  this.reset();
}

function handleSignIn(e: Event) {
  e.preventDefault();
  const userName = userNameInput.value;
  const password = passwordInput.value;

  if (checkIfUserExists(userName, password)) {
    setCurrentUser(userName);
    signInForm.reset();
    window.location.href = "index.html";
  } else {
    alert("user not in database");
  }
}

function displayProfile(user: User) {
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

function updateUserBoardList(userToUpdate: User, boardToUpdate: Board) {
  if (userList) {
    const findUser = userList.find(
      (user) => user.uid === userToUpdate.uid
    );
    if (findUser) {
      const findBoard = findUser.boardList.find(
        (board) => board.uid === boardToUpdate.uid
      );
      if (findBoard) {
        const boardIndex = findUser.boardList.indexOf(findBoard);
        // const indexCurrentUser = currentUser.boardList.indexOf(findBoard);
        findUser.boardList[boardIndex] = boardToUpdate;
        currentUser.boardList[boardIndex] = boardToUpdate;
      } else {
        findUser.boardList.unshift(boardToUpdate);
        currentUser.boardList.unshift(boardToUpdate);
      }
    }
    localStorage.setItem("signedUpUsers", JSON.stringify(userList));
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
    return userList.find(
      (user) => user.userName === userName && user.password === password
    );
  } catch (error) {
    console.log(error);
  }
}

function renderBoardsToMain(listOFBoards: Board[]) {
  try {
    boardArea.innerHTML = listOFBoards
      .map((board) => {
        return `
      <div class='board' 
      style='background-color: ${board.backgroundColor}'>
      <p class="boardClick">${board.name}</p>
      <button class="removeBoard" data-name="${board.name}">DELETE</button>
      </div>
      `;
      })
      .join("");
  } catch (error) {
    console.log(error);
  }
}

function createBoard() {
  try {
    let boardName = newBoardName.value;
    let boardColor = newnBoardColor.value;
    if (boardName && boardColor) {
      if (currentUser.boardList.find((board) => board.name === boardName))
        return alert("There is already a board with that name");
      const newBoard = new Board(boardName, boardColor);
      updateUserBoardList(currentUser, newBoard);
      localStorage.setItem("currentBoard", JSON.stringify(newBoard));
      location.href = "board.html";
      boardName = "";
      boardColor = "";
      newBoardWindow.style.display = "none";
      renderBoardsToMain(currentUser.boardList);
    } else {
      alert("missing field");
    }
  } catch (error) {
    console.log(error);
  }
}

function createList() {
  if (newListInput.value == "") return;
  const newList = new List(newListInput.value);
  saveListTolocalStorage(newList);
  boardContainer.append(createNewColumn(newList));
  newListInput.value = "";
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

function renderBoardInBoardPage() {
  try {
    boardTitle.textContent = currentBoard.name;
    boardContainer.style.backgroundColor = currentBoard.backgroundColor;
    renderLists();
  } catch (error) {
    console.log(error);
  }
}

function renderLists() {
  currentBoard.lists.forEach((list) => {
    const columnElement = createNewColumn(list);
    const ListElement = columnElement.querySelector(
      ".boardContainer__main__column__list"
    ) as HTMLDivElement;

    list.cards.forEach((card) => {
      createNewCard(card, ListElement);
    });
    boardContainer.append(columnElement);
  });
}

function saveListTolocalStorage(list: List) {
  currentBoard.lists.push(list);
  localStorage.setItem("currentBoard", JSON.stringify(currentBoard));
  const boardToUpdate = currentUser.boardList.find(
    (board) => board.uid == currentBoard.uid
  ) as Board;
  boardToUpdate.lists.push(list);
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  
  userList = userList.map((user) =>
    user.uid === currentUser.uid ? currentUser : user
  );
  localStorage.setItem("signedUpUsers", JSON.stringify(userList));

  // const signedUpUsers = JSON.parse(
  //   localStorage.getItem("signedUpUsers") || "[]"
  // ) as User[];
  // for (let user of signedUpUsers) {
  //   if (user.userName === currentUser.userName) {
  //     user.boardList.find((board) => board.name === currentBoard.name)
  //       ?.lists.push(list);
  //     localStorage.setItem("signedUpUsers", JSON.stringify(signedUpUsers));
  //   }
  // }
}


function saveCardTolocalStorage(cardName: string, listUid: string) {
  const findList = currentBoard.lists.find(
    (list) => list.uid === listUid
  ) as List;
  if (findList) findList.cards.push(cardName);
  currentBoard.lists = currentBoard.lists.map((list) =>
    list.uid === findList.uid ? findList : list
  );
  localStorage.setItem("currentBoard", JSON.stringify(currentBoard));

  currentUser.boardList = currentUser.boardList.map((board) =>
    board.uid === currentBoard.uid ? currentBoard : board
  );
  localStorage.setItem("currentUser", JSON.stringify(currentUser));

  userList = userList.map((user) =>
    user.uid === currentUser.uid ? currentUser : user
  );
  localStorage.setItem("signedUpUsers", JSON.stringify(userList));
}


// delete from local storage
function deleteBoard(boardName: string) {
  const boardIndex = currentUser.boardList.findIndex(
    (board) => board.name === boardName
  );
  currentUser.boardList.splice(boardIndex, 1);
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  const findUser = userList.find((user) => user.uid === currentUser.uid);
  if (findUser) findUser.boardList.splice(boardIndex, 1);
  localStorage.setItem("signedUpUsers", JSON.stringify(userList));
}

function editBoard(board: Board) {
  board.name = nameInputEle.value;
  board.backgroundColor = colorInputEle.value;
  localStorage.setItem("currentBoard", JSON.stringify(board));
  boardTitle.textContent = board.name;
  boardContainer.style.backgroundColor = board.backgroundColor;
  updateUserBoardList(currentUser, board);
}


function test(){
  console.log('no!');
  return true;
}