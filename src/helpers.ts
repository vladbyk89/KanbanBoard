function checkIfCurrentUserExists() {
  if (!localStorage.getItem("currentUser")) {
    window.location.href = "login.html";
  }
}