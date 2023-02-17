function readLocalStorage() { }
function sevelocalStorage(data) {
    localStorage.setItem("board-data", JSON.stringify(data));
}
var grabCard = document.querySelectorAll(".task");
var drappables = document.querySelectorAll(".swim-lane");
grabCard.forEach(function (task) {
    task.addEventListener("dragstart", function () {
        task.classList.add("is-dragging");
    });
    task.addEventListener("dragend", function () {
        task.classList.remove("is-dragging");
    });
});
drappables.forEach(function (zone) {
    zone.addEventListener("dragover", function (e) {
        e.preventDefault();
        var bottomTask = insertAboveTask(zone, e.clientY); //e.screenY //pageY
        var curTask = document.querySelector(".is-dragging");
        if (!bottomTask) {
            zone.appendChild(curTask);
        }
        else {
            zone.insertBefore(curTask, bottomTask);
        }
    });
});
var insertAboveTask = function (zone, mouseY) {
    var els = zone.querySelectorAll(".task:not(.is-dragging)");
    var closestTask = null;
    var closestOffset = Number.NEGATIVE_INFINITY;
    els.forEach(function (task) {
        var top = task.getBoundingClientRect().top;
        var offset = mouseY - top;
        if (offset < 0 && offset > closestOffset) {
            closestOffset = offset;
            closestTask = task;
        }
    });
    return closestTask;
};
