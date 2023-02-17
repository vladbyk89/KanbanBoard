function checkIfCurrentUserExists() {
  if (!localStorage.getItem("currentUser")) {
    window.location.href = "login.html";
  }
}

const findProductName = (input: string, arr: Board[]): Board[] | false => {
  try {
    const filteredByString = arr.filter((ele) =>
      ele.name.toLowerCase().includes(input)
    );
    return filteredByString;
  } catch (error) {
    console.log(error);
    return false;
  }
};
