function checkIfCurrentUserExists() {
    try {
        if (!localStorage.getItem("currentUser")) {
            window.location.href = "login.html";
        }
    }
    catch (error) {
        console.log(error);
    }
}
var findProductName = function (input, arr) {
    try {
        var filteredByString = arr.filter(function (ele) {
            return ele.name.toLowerCase().includes(input);
        });
        return filteredByString;
    }
    catch (error) {
        console.log(error);
        return false;
    }
};
