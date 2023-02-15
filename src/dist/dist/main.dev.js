"use strict";

profileBtn.addEventListener("click", function () {
  displayUser(preMadeList[1]);
});
backToMain.addEventListener("click", function () {
  return profileWindow.style.display = "none";
});
createBoardBtn.addEventListener("click", function () {
  return console.log("Create board clicked");
});