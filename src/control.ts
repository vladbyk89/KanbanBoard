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
  if (arr.some((ele) => ele == "")) return alert("missing field");
  if (checkIfEmailExists(email)) return alert("Email is alreay in the system");
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
    User.setCurrentUser(userName);
    signInForm.reset();
    window.location.href = "index.html";
  } else {
    alert("user not in database");
  }
}

function handleRecovery(e: Event) {
  e.preventDefault();
  const firstName = this.elements.firstName.value;
  const lastName = this.elements.lastName.value;
  const userName = this.elements.userName.value;
  const email = this.elements.email.value;
  const phone = this.elements.phoneNumber.value;
  const arr = [firstName, lastName, userName, email, phone];
  if (arr.some((ele) => ele == "")) return alert("missing field");
  const userList = userListFromStorage();
  const findUser = userList.find(
    (user) =>
      user.userName == userName ||
      user.firstName == firstName ||
      user.lastName == lastName ||
      user.email == email ||
      user.phoneNumber == phone
  );
  if (!findUser) return alert("No such user exists");
  recoveredPassword.textContent = findUser.password;
  passwordDisplayDiv.style.display = "flex";
}

function displayProfile(user: User) {
  try {
    profileWindow.style.display = "flex";
    if (user) {
      return (profileDiv.innerHTML = `
        <ul>
          <h1>About you:</h1>
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
  } catch (error) {
    console.log(error);
  }
}

function updateUserBoardList(userToUpdate: User, boardToUpdate: Board) {
  try {
    const userList = userListFromStorage();
    if (userList) {
      const findUser = userList.find((user) => user.uid === userToUpdate.uid);
      if (findUser) {
        const findBoard = findUser.boardList.find(
          (board) => board.uid === boardToUpdate.uid
        );
        if (findBoard) {
          const boardIndex = findUser.boardList.indexOf(findBoard);
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
  } catch (error) {
    throw error;
  }
}

function checkIfUserExists(userName: string, password: string) {
  try {
    const userList = userListFromStorage();
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
      <button class="removeBoard" data-name="${board.name}">Delete</button>
      </div>
      `;
      })
      .join("");
  } catch (error) {
    console.log(error);
  }
}

function createBoard(boardName: string, boardImage: string) {
  try {
    if (currentUser.boardList.length === 10)
      return alert("maxinum amount of boards is 10");
    if (boardName) {
      if (currentUser.boardList.find((board) => board.name === boardName))
        return alert("There is already a board with that name");
      const newBoard = new Board(boardName, boardImage);
      updateUserBoardList(currentUser, newBoard);
      localStorage.setItem("currentBoard", JSON.stringify(newBoard));
      location.href = "board.html";
    } else {
      alert("Board Name Is Missing");
    }
  } catch (error) {
    console.log(error);
  }
}
function makeListFunctional(listContainer: HTMLElement) {
  listContainer.addEventListener("dragstart", () => {
    listContainer.classList.add("is-draggin");
  });
  listContainer.addEventListener("dragend", () => {
    listContainer.classList.remove("is-draggin");
  });

  listContainer.addEventListener("dragover", dragginCard);

  const editListBtn = listContainer.querySelector(
    ".editListBtn"
  ) as HTMLElement;
  editListBtn.addEventListener("click", editList);

  const newCardTextArea = listContainer.querySelector(
    ".newCardTextArea"
  ) as HTMLTextAreaElement;
  newCardTextArea.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      if (newCardTextArea.value.trim() !== "") {
        createCardElement(newCardTextArea.value.trim(), listContainer);
        newCardTextArea.value = "";
      }
    }
  });
}

function dragginCard({ clientY }) {
  let cardIsDragged = false;
  cards.forEach((card) => {
    if (card.classList.contains("is-dragging")) {
      cardIsDragged = true;
    }
  });
  if (!cardIsDragged) return;
  // e.preventDefault();

  const bottomTask = insertAboveTask(this, clientY);
  const curTask = document.querySelector(".is-dragging") as HTMLElement;

  if (!bottomTask) {
    this.appendChild(curTask);
  } else {
    this.insertBefore(curTask, bottomTask);
  }
  currentBoard.update();
}

function editList() {
  const listTitle = this.parentNode as HTMLElement;
  const listTitleText = listTitle.querySelector("h2") as HTMLElement;
  const editListInput = document.createElement("input");

  editListInput.type = "text";
  editListInput.value = listTitleText.textContent!;
  editListInput.classList.add("editListInput");

  listTitle.replaceChild(editListInput, listTitleText);
  editListInput.focus();

  editListInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      listTitle.replaceChild(listTitleText, editListInput);
      listTitleText.textContent = editListInput.value.trim();
      currentBoard.update();
    }
  });
}

function createCardElement(cardName: string, list: Element) {
  const card = document.createElement("div");
  card.classList.add("boardContainer__main__list__card");
  card.setAttribute("draggable", "true");
  card.setAttribute("ondragstart", `drag(event)`);
  card.setAttribute("id", `${uid()}`);
  card.innerHTML = `
  <p>${cardName}</p>
  <i class="fa-regular fa-pen-to-square editCardBtn"></i>
  `;
  const cardTitle = list.querySelector(
    ".boardContainer__main__list__header"
  ) as HTMLDivElement;
  list.insertBefore(card, cardTitle.nextSibling);

  const editCardBtn = card.querySelector(".editCardBtn") as HTMLElement;

  editCardBtn.addEventListener("click", () => {
    const cardTitle = card.querySelector(
      ".boardContainer__main__list__card > p"
    ) as HTMLElement;
    if (!cardTitle) {
      console.error("Card title element not found!");
      return;
    }

    const editCardInput = document.createElement("input");

    editCardInput.type = "text";
    editCardInput.value = cardTitle.textContent!;
    editCardInput.classList.add("editCardInput");

    editCardInput.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        const newCardTitle = document.createElement("p");
        newCardTitle.textContent = editCardInput.value.trim();
        editCardInput.replaceWith(newCardTitle);
      }
    });

    cardTitle.replaceWith(editCardInput);
    editCardInput.focus();
    currentBoard.update();
  });

  card.addEventListener("dragstart", () => {
    card.classList.add("is-dragging");
  });
  card.addEventListener("dragend", () => {
    card.classList.remove("is-dragging");
  });
  currentBoard.update();
  // Add new card to cards variable
  cards = document.querySelectorAll(
    ".boardContainer__main__list__card"
  ) as NodeListOf<HTMLDivElement>;
}

function renderBoardInBoardPage() {
  try {
    boardTitle.textContent = currentBoard.name;
    boardContainer.style.background = `url(${currentBoard.backgroundImage}) no-repeat center / cover`;
    currentBoard.lists.forEach((list) => {
      const listObj = new List(list.name, list.cards, list.uid);
      const ListElement = listObj.createListElement();

      list.cards.forEach((card) => {
        createCardElement(card, ListElement);
      });
    });
  } catch (error) {
    console.log(error);
  }
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
  // el?.parentNode?.removeChild(el); => delete without Warning
  currentBoard.update();
}
