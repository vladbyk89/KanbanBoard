function handleSignUp(e) {
    e.preventDefault();
    // e.stopPropagation();
    var gender = this.elements.gender.value;
    var firstName = this.elements.firstName.value;
    var lastName = this.elements.lastName.value;
    var password = this.elements.password.value;
    var userName = this.elements.userName.value;
    var email = this.elements.email.value;
    var phone = this.elements.phoneNumber.value;
    var arr = [gender, firstName, lastName, password, userName, email, phone];
    console.log(arr);
    if (arr.some(function (ele) { return ele == ""; }))
        return alert("missing field");
    var newUser = new User(firstName, lastName, gender, userName, password, email, phone);
    var signedUpUsers = JSON.parse(localStorage.getItem("signedUpUsers") || "[]");
    signedUpUsers.push(newUser);
    localStorage.setItem("signedUpUsers", JSON.stringify(signedUpUsers));
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    location.href = "index.html";
    this.reset();
}
function handleSignIn(e) {
    e.preventDefault();
    var userName = userNameInput.value;
    var password = passwordInput.value;
    if (checkIfUserExists(userName, password)) {
        setCurrentUser(userName);
        signInForm.reset();
        window.location.href = "index.html";
    }
    else {
        alert("user not in database");
    }
}
function displayProfile(user) {
    profileWindow.style.display = "flex";
    if (user) {
        return (profileDiv.innerHTML = "\n      <ul>\n        <h1>About you</h1>\n        <li>Name: " + user.firstName + " " + user.lastName + "</li>\n        <li>Gender: " + user.gender + "</li>\n        <li>Email: " + user.email + "</li>\n        <li>Phone Number: " + user.phoneNumber + "</li>\n        <li>User Name: " + user.userName + "</li>\n        <li>Password: " + user.password + "</li>\n      </ul>\n      ");
    }
    return (profileDiv.innerHTML = "\n    <ul>\n      <h1>About you</h1>\n      <li>Name: EMPTY</li>\n      <li>Gender: EMPTY</li>\n      <li>Email: EMPTY</li>\n      <li>Phone Number: EMPTY</li>\n      <li>User Name: EMPTY</li>\n      <li>Password: EMPTY</li>\n    </ul>\n    ");
}
function updateUserBoardList(userToUpdate, boardToUpdate) {
    if (userList) {
        var findUser = userList.find(function (user) { return user.uid === userToUpdate.uid; });
        if (findUser) {
            var findBoard = findUser.boardList.find(function (board) { return board.uid === boardToUpdate.uid; });
            if (findBoard) {
                var boardIndex = findUser.boardList.indexOf(findBoard);
                // const indexCurrentUser = currentUser.boardList.indexOf(findBoard);
                findUser.boardList[boardIndex] = boardToUpdate;
                currentUser.boardList[boardIndex] = boardToUpdate;
            }
            else {
                findUser.boardList.unshift(boardToUpdate);
                currentUser.boardList.unshift(boardToUpdate);
            }
        }
        localStorage.setItem("signedUpUsers", JSON.stringify(userList));
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
}
function checkIfUserExists(userName, password) {
    try {
        return userList.find(function (user) { return user.userName === userName && user.password === password; });
    }
    catch (error) {
        console.log(error);
    }
}
function renderBoardsToMain(listOFBoards) {
    try {
        boardArea.innerHTML = listOFBoards
            .map(function (board) {
            return "\n      <div class='board' style=\"background: url(" + board.backgroundImage + ") center center / cover no-repeat\">\n      <p class=\"boardClick\">" + board.name + "</p>\n      <button class=\"removeBoard\" data-name=\"" + board.name + "\">DELETE</button>\n      </div>\n      ";
        })
            .join("");
    }
    catch (error) {
        console.log(error);
    }
}
function createBoard() {
    try {
        var boardName_1 = newBoardName.value;
        // let boardColor = newnBoardColor.value;
        var boardImage = imageDisplayedInCreate.src.toString();
        if (boardName_1) {
            if (currentUser.boardList.find(function (board) { return board.name === boardName_1; }))
                return alert("There is already a board with that name");
            var newBoard = new Board(boardName_1, boardImage);
            updateUserBoardList(currentUser, newBoard);
            localStorage.setItem("currentBoard", JSON.stringify(newBoard));
            boardName_1 = "";
            boardImage = "./img/Screenshot 2023-02-18 230204.png";
            newBoardWindow.style.display = "none";
            renderBoardsToMain(currentUser.boardList);
            location.href = "board.html";
        }
        else {
            alert("Board Name Is Missing");
        }
    }
    catch (error) {
        console.log(error);
    }
}
function createListElement(list) {
    var listContainer = document.createElement("div");
    listContainer.classList.add("boardContainer__main__list");
    listContainer.setAttribute("draggable", "true");
    listContainer.setAttribute("id", "" + list.uid);
    listContainer.setAttribute("ondragstart", "drag(event)");
    var header = document.createElement("div");
    header.classList.add("boardContainer__main__list__header");
    header.setAttribute("id", list.name + "_header");
    header.innerHTML = "\n  <div class=\"listTitle\" >\n    <h2 contenteditable>" + list.name + "</h2>\n    <i class=\"fa-regular fa-pen-to-square editListBtn\"></i>\n    </div>\n    <div class=\"boardContainer__main__list__card--addCard\">\n      <textarea maxlength=\"30\" class=\"newCardTextArea\" cols=\"30\" rows=\"3\"></textarea>\n      <button class=\"newCardBtn\">New Card</button>\n    </div>\n  ";
    listContainer.appendChild(header);
    listContainer.addEventListener("dragstart", function () {
        listContainer.classList.add("is-draggin");
    });
    listContainer.addEventListener("dragend", function () {
        listContainer.classList.remove("is-draggin");
    });
    listContainer.addEventListener("dragover", function (e) {
        var cardIsDragged = false;
        cards.forEach(function (card) {
            if (card.classList.contains("is-dragging")) {
                cardIsDragged = true;
            }
        });
        if (!cardIsDragged)
            return;
        e.preventDefault();
        var bottomTask = insertAboveTask(listContainer, e.clientY);
        var curTask = document.querySelector(".is-dragging");
        if (!bottomTask) {
            listContainer.appendChild(curTask);
        }
        else {
            listContainer.insertBefore(curTask, bottomTask);
        }
        updateCurrentBoard();
    });
    boardContainer.append(listContainer);
    updateCurrentBoard();
    return listContainer;
}
function createList() {
    if (newListInput.value == "")
        return;
    var newList = new List(newListInput.value);
    boardContainer.append(createListElement(newList));
    // saveListTolocalStorage(newList);
    newListInput.value = "";
}
function createCardElement(cardName, list) {
    var card = document.createElement("div");
    card.classList.add("boardContainer__main__list__card");
    card.setAttribute("draggable", "true");
    card.setAttribute("ondragstart", "drag(event)");
    card.setAttribute("id", "" + uid());
    card.innerHTML = "\n  <p contenteditable>" + cardName + "</p>\n  <i class=\"fa-regular fa-pen-to-square editCardBtn\"></i>\n  ";
    var cardTitle = list.querySelector(".boardContainer__main__list__header");
    list.insertBefore(card, cardTitle.nextSibling);
    card.addEventListener("dragstart", function () {
        card.classList.add("is-dragging");
    });
    card.addEventListener("dragend", function () {
        card.classList.remove("is-dragging");
    });
    updateCurrentBoard();
    // Add new card to cards variable
    cards = document.querySelectorAll(".boardContainer__main__list__card");
}
function renderBoardInBoardPage() {
    try {
        boardTitle.textContent = currentBoard.name;
        // boardContainer.style.backgroundColor = currentBoard.backgroundColor;
        boardContainer.style.background = "url(" + currentBoard.backgroundImage + ") no-repeat center / cover";
        renderLists();
    }
    catch (error) {
        console.log(error);
    }
}
function renderLists() {
    currentBoard.lists.forEach(function (list) {
        var ListElement = createListElement(list);
        list.cards.forEach(function (card) {
            createCardElement(card, ListElement);
        });
    });
}
// delete board from local storage
function deleteBoard(boardName) {
    var boardIndex = currentUser.boardList.findIndex(function (board) { return board.name === boardName; });
    currentUser.boardList.splice(boardIndex, 1);
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    var findUser = userList.find(function (user) { return user.uid === currentUser.uid; });
    if (findUser)
        findUser.boardList.splice(boardIndex, 1);
    localStorage.setItem("signedUpUsers", JSON.stringify(userList));
}
function editBoard(board) {
    board.name = nameInputEle.value;
    // board.backgroundColor = colorInputEle.value;
    board.backgroundImage = imageDisplayedInEdit.src;
    localStorage.setItem("currentBoard", JSON.stringify(board));
    boardTitle.textContent = board.name;
    // boardContainer.style.backgroundColor = board.backgroundColor;
    boardContainer.style.background = "url(" + currentBoard.backgroundImage + ") no-repeat center / cover";
    updateUserBoardList(currentUser, board);
}
function updateCurrentBoard() {
    currentBoard.lists = [];
    var listElements = boardContainer.querySelectorAll(".boardContainer__main__list");
    listElements.forEach(function (list) {
        var _a;
        var listName = (_a = list.querySelector("h2")) === null || _a === void 0 ? void 0 : _a.innerHTML;
        var cardsArr = [];
        list.querySelectorAll("p").forEach(function (card) { return cardsArr.push(card.innerHTML); });
        var newList = new List(listName, Array.from(cardsArr));
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
    var _a;
    ev.preventDefault();
    var data = ev.dataTransfer.getData("Text");
    var el = document.getElementById(data);
    (_a = el === null || el === void 0 ? void 0 : el.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(el);
    updateCurrentBoard();
}
