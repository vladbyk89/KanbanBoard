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

const draggables = document.querySelectorAll(
  ".boardContainer__main__list__card"
);
draggables.forEach((task) => {
  task.addEventListener("dragstart", () => {
    console.log(task);
    task.classList.add("is-dragging");
  });
  task.addEventListener("dragend", () => {
    console.log(task);
    task.classList.remove("is-dragging");
  });
});

const draggablesList = document.querySelectorAll(".boardContainer__main__list");
draggablesList.forEach((task) => {
  task.addEventListener("dragstart", () => {
    console.log(task);
    task.classList.add("is-draggingList");
  });
  task.addEventListener("dragend", () => {
    console.log(task);
    task.classList.remove("is-draggingList");
  });
});

const draggablesAll = document.querySelectorAll(
  "boardContainer__main__list__card"
);
draggablesAll.forEach((zone) => {
  zone.addEventListener("dragstart", (e) => {
    e.preventDefault();
    const bottomTask = insertAboveTask(zone, e.clientY);  //${e.screenY}
    const curCard: any = document.querySelector("is-draggingList")
    if (!bottomTask) {
        zone.appendChild(curCard);

  });
});
const insertAboveTask = (zone, mouseY) => {
  const els = zone.querySelectorAll(
    ".boardContainer__main__list__card:not(.is-dragging)"
  );
  let closestCard = null;
  let closestOffset = Number.NEGATIVE_INFINITY;
  els.forEach((card)=>{
const {top} = card.getBoundingClientRect();
const offset = mouseY - top;
if (offset < 0 && offset > closestOffset){
    closestOffset = offset;
    closestCard = card;
}
  });
  return closestCard;
};
