const insertLeftOfLisk = (zone: HTMLElement, mouseX: number) => {
  const staticLists = zone.querySelectorAll(
    ".boardContainer__main__list:not(.is-dragging)"
  );

  let closestTask: null | Element = null;
  let closestOffset = Number.NEGATIVE_INFINITY;

  staticLists.forEach((list) => {
    const cardBoundaries = list.getBoundingClientRect();

    const offset = mouseX - cardBoundaries.left - cardBoundaries.width / 2;

    if (offset < 0 && offset > closestOffset) {
      closestOffset = offset;
      closestTask = list;
    }
  });

  return closestTask;
};

const insertAboveTask = (zone, mouseY) => {
  const staticCards = zone.querySelectorAll(
    ".boardContainer__main__list__card:not(.is-dragging)"
  );

  let closestTask = null;
  let closestOffset = Number.NEGATIVE_INFINITY;

  staticCards.forEach((card) => {
    const cardBoundaries = card.getBoundingClientRect();

    const offset = mouseY - cardBoundaries.top - cardBoundaries.height / 2;

    if (offset < 0 && offset > closestOffset) {
      closestOffset = offset;
      closestTask = card;
    }
  });

  return closestTask;
};

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

function setCurrentUser(userName: string) {
  try {
    const getLocalStorage = localStorage.getItem("signedUpUsers");
    if (getLocalStorage) {
      const usersList = JSON.parse(getLocalStorage) as User[];
      const findUser = usersList.find((user) => user.userName === userName);
      if (findUser) {
        currentUser = findUser as User;
        localStorage.setItem("currentUser", JSON.stringify(findUser));
      }
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
