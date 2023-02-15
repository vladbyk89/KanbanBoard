profileBtn.addEventListener("click", () => {
  displayUser(preMadeList[1])
});

backToMain.addEventListener(
  "click",
  () => (profileWindow.style.display = "none")
);

createBoardBtn.addEventListener("click", () =>
  console.log("Create board clicked")
);

