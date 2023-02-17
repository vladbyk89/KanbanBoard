renderBoardsToMain(currentUser.boardList);
createBoardWindowBtn.addEventListener("click", function () { return (newBoardWindow.style.display = "flex"); });
cancelCreateBoardBtn.addEventListener("click", function () { return (newBoardWindow.style.display = "none"); });
createBoardBtn.addEventListener("click", createBoard);
signOutBtn.addEventListener("click", function () {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
});
