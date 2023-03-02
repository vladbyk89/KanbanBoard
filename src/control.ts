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
  profileWindow.style.display = "flex";
  if (user) {
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
    const findUser = userList.find((user) => user.uid === userToUpdate.uid);
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
      <div class='board' style="background: url(${board.backgroundImage}) center center / cover no-repeat">
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
    // let boardColor = newnBoardColor.value;
    let boardImage = imageDisplayedInCreate.src.toString();
    if (boardName) {
      if (currentUser.boardList.find((board) => board.name === boardName))
        return alert("There is already a board with that name");
      const newBoard = new Board(boardName, boardImage);
      updateUserBoardList(currentUser, newBoard);
      localStorage.setItem("currentBoard", JSON.stringify(newBoard));
      boardName = "";
      boardImage = "./img/Screenshot 2023-02-18 230204.png";
      newBoardWindow.style.display = "none";
      renderBoardsToMain(currentUser.boardList);
      location.href = "board.html";
    } else {
      alert("Board Name Is Missing");
    }
  } catch (error) {
    console.log(error);
  }
}
function createListElement(list: List) {
  const listContainer = document.createElement("div");
  listContainer.classList.add("boardContainer__main__list");
  listContainer.setAttribute("draggable", "true");
  listContainer.setAttribute("id", `${list.uid}`);
  listContainer.setAttribute("ondragstart", `drag(event)`);

  const header = document.createElement("div");
  header.classList.add("boardContainer__main__list__header");
  header.setAttribute("id", `${list.name}_header`);
  header.innerHTML = `
  <div class="listTitle" >
    <h2 contenteditable>${list.name}</h2>
    <i class="fa-regular fa-pen-to-square editListBtn"></i>
    </div>
    <div class="boardContainer__main__list__card--addCard">
      <textarea maxlength="30" class="newCardTextArea" cols="30" rows="3"></textarea>
      <button class="newCardBtn">New Card</button>
    </div>
  `;
  listContainer.appendChild(header);

  const newCardTextArea = listContainer.querySelector(".newCardTextArea")as HTMLTextAreaElement;

  newCardTextArea.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
      const newCardBtn = listContainer.querySelector(".newCardBtn") as HTMLButtonElement;
      if (newCardTextArea.value.trim() !== '') {
        createCardElement(newCardTextArea.value.trim(), listContainer);
        newCardTextArea.value = "";
      }
    }
  });
  
  listContainer.addEventListener("dragstart", () => {
    listContainer.classList.add("is-draggin");
  });
  listContainer.addEventListener("dragend", () => {
    listContainer.classList.remove("is-draggin");
  });

  listContainer.addEventListener("dragover", (e) => {
    let cardIsDragged = false;
    cards.forEach((card) => {
      if (card.classList.contains("is-dragging")) {
        cardIsDragged = true;
      }
    });
    if (!cardIsDragged) return;
    e.preventDefault();

    const bottomTask = insertAboveTask(listContainer, e.clientY);
    const curTask = document.querySelector(".is-dragging") as HTMLElement;

    if (!bottomTask) {
      listContainer.appendChild(curTask);
    } else {
      listContainer.insertBefore(curTask, bottomTask);
    }
    updateCurrentBoard();
  });

  boardContainer.append(listContainer);
  updateCurrentBoard();
  return listContainer;
}

function createList() {
  if (newListInput.value == "")return;
  const newList = new List(newListInput.value);
  boardContainer.append(createListElement(newList));
  // saveListTolocalStorage(newList);
  newListInput.value = "";
}

function createCardElement(cardName: string, list: Element) {
  const card = document.createElement("div");
  card.classList.add("boardContainer__main__list__card");
  card.setAttribute("draggable", "true");
  card.setAttribute("ondragstart", `drag(event)`);
  card.setAttribute("id", `${uid()}`);
  card.innerHTML = `
  <p contenteditable>${cardName}</p>
  <i class="fa-regular fa-pen-to-square editCardBtn"></i>
  `;
  const cardTitle = list.querySelector(
    ".boardContainer__main__list__header"
  ) as HTMLDivElement;
  list.insertBefore(card, cardTitle.nextSibling);
  card.addEventListener("dragstart", () => {
    card.classList.add("is-dragging");
  });
  card.addEventListener("dragend", () => {
    card.classList.remove("is-dragging");
  });
  updateCurrentBoard();
  // Add new card to cards variable
  cards = document.querySelectorAll(
    ".boardContainer__main__list__card"
  ) as NodeListOf<HTMLDivElement>;
}

function renderBoardInBoardPage() {
  try {
    boardTitle.textContent = currentBoard.name;
    boardContainer.style.background = `url(${currentBoard.backgroundImage}) no-repeat center / cover`;
    renderLists();
  } catch (error) {
    console.log(error);
  }
}

function renderLists() {
  currentBoard.lists.forEach((list) => {
    const ListElement = createListElement(list);

    list.cards.forEach((card) => {
      createCardElement(card, ListElement);
    });
  });
}

// delete board from local storage
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
  // board.backgroundColor = colorInputEle.value;
  board.backgroundImage = imageDisplayedInEdit.src;
  localStorage.setItem("currentBoard", JSON.stringify(board));
  boardTitle.textContent = board.name;
  // boardContainer.style.backgroundColor = board.backgroundColor;
  boardContainer.style.background = `url(${currentBoard.backgroundImage}) no-repeat center / cover`;
  updateUserBoardList(currentUser, board);
}

function updateCurrentBoard() {
  currentBoard.lists = [];
  const listElements = boardContainer.querySelectorAll(
    ".boardContainer__main__list"
  );
  listElements.forEach((list) => {
    const listName = list.querySelector("h2")?.innerHTML as string;
    const cardsArr: string[] = [];
    list.querySelectorAll("p").forEach((card) => cardsArr.push(card.innerHTML));
    const newList = new List(listName, Array.from(cardsArr));
    currentBoard.lists.push(newList);
  });
  localStorage.setItem("currentBoard", JSON.stringify(currentBoard));
  updateUserBoardList(currentUser, currentBoard);
}

function allowDrop(ev) {
  ev.preventDefault();
}
function drag(ev) {
  ev.dataTransfer.setData("Text", ev.target.id);
}
function drop(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("Text");
  const el = document.getElementById(data);
  el?.parentNode?.removeChild(el);
  updateCurrentBoard();
}
