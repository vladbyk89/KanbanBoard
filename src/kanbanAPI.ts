//   function readLocalStorage() {
//     const json = localStorage.getItem("board-data");
//     if (!json) {
//       return [
//         {
//           id: 1,
//           items: [],
//         },
//         {
//           id: 2,
//           items: [],
//         },
//         {
//           id: 3,
//           items: [],
//         },
//       ];
//     }
//     return JSON.parse(json);
//   }

//   function sevelocalStorage(data) {
//     localStorage.setItem("board-data", JSON.stringify(data));
//   }

const draggables = document.querySelectorAll(".task");
const drappables = document.querySelectorAll(".swim-lane");
draggables.forEach((task) => {
  task.addEventListener("dragstart", () => {
    task.classList.add("is-dragging");
  });
  task.addEventListener("dragend", () => {
    task.classList.remove("is-dragging");
  });
});


drappables.forEach((zone) => {
  zone.addEventListener("dragover", (e) => {
    e.preventDefault();

    const bottomTask = insertAboveTask(zone, e.clientY); //e.screenY //pageY
    const curTask:any = document.querySelector(".is-dragging");

    if (!bottomTask) {
      zone.appendChild(curTask);
    } else {
      zone.insertBefore(curTask, bottomTask);
    }
  });
});

const insertAboveTask = (zone, mouseY) => {
  const els = zone.querySelectorAll(".task:not(.is-dragging)");
  let closestTask = null;
  let closestOffset = Number.NEGATIVE_INFINITY;

  els.forEach((task) => {
    const  {top}  = task.getBoundingClientRect();
    const offset = mouseY - top;
    if (offset < 0 && offset > closestOffset) {
      closestOffset = offset;
      closestTask = task;
    }
  });

  return closestTask;
};

