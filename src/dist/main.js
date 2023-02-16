profileBtn.addEventListener("click", function () {
    displayUser(currentUser);
});
backToMain.addEventListener("click", function () { return (profileWindow.style.display = "none"); });
createBoardWindowBtn.addEventListener("click", function () { return (newBoardWindow.style.display = "flex"); });
cancelCreateBoardBtn.addEventListener("click", function () { return (newBoardWindow.style.display = "none"); });
createBoardBtn.addEventListener("click", createBoard);
function createBoard() {
    console.log("createBoard() running");
    if (boardName.value && boardColor.value) {
        if (!currentUser)
            return alert("not signed in");
        var newBoard = new Board(boardName.value, boardColor.value);
        addNewBoardToUserInLocalStorage(currentUser, newBoard);
        location.href = "board.html";
        console.table(preMadeUserList);
    }
    else {
        alert("missing field");
    }
}
