profileBtn.addEventListener("click", function () {
    displayUser(preMadeList[1]);
});
backToMain.addEventListener("click", function () { return (profileWindow.style.display = "none"); });
createBoardWindowBtn.addEventListener("click", function () {
    newBoardWindow.style.display = "flex";
});
createBoardBtn.addEventListener("click", createBoard);
function createBoard() {
    console.log("clicked");
    if (boardName.value && boardColor.value) {
        console.log("object");
        var newBoard = new Board(boardName.value, boardColor.value);
        addNewBoardToUserInLocalStorage(currentUser, newBoard);
        location.href = "board.html";
        console.table(preMadeList);
    }
}
