renderBoardsToMain(currentUser.boardList);
createBoardWindowBtn.addEventListener("click", function () { return (newBoardWindow.style.display = "flex"); });
cancelCreateBoardBtn.addEventListener("click", function () { return (newBoardWindow.style.display = "none"); });
createBoardBtn.addEventListener("click", createBoard);
// signOutBtn.addEventListener("click", () => {
//   localStorage.removeItem("currentUser");
//   window.location.href = "login.html";
// });
searchBar.addEventListener("keyup", function () {
    if (searchBar.value != "") {
        boardArea.innerHTML = "";
        var listToDisplay = findProductName(searchBar.value, currentUser.boardList);
        if (listToDisplay !== false) {
            renderBoardsToMain(listToDisplay);
        }
    }
    else {
        renderBoardsToMain(currentUser.boardList);
    }
});
