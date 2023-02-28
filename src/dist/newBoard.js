// function allowDrop(ev)
// {
// ev.preventDefault();
// }
// function drag(ev)
// {
// ev.dataTransfer.setData("Text",ev.target.id);
// }
// function drop(ev)
// {
// ev.preventDefault();
// var data=ev.dataTransfer.getData("Text");
// var el = document.getElementById(data);
// el.parentNode.removeChild(el);
// }
//contenteditable function for editing name
// const cardMovement = () => {
//   const grabCard = document.querySelectorAll(
//     ".boardContainer__main__list__card"
//   );
//   const drappables = document.querySelectorAll(
//     ".boardContainer__main__list"
//   );
//   grabCard.forEach((task) => {
//     task.addEventListener("dragstart", () => {
//       task.classList.add("is-dragging");
//     });
//     task.addEventListener("dragend", () => {
//       task.classList.remove("is-dragging");
//     });
//   });
//   drappables.forEach((zone) => {
//     zone.addEventListener("dragover", (e) => {
//       const bottomTask = insertAboveTask(zone, e.clientY); //e.screenY //pageY
//       const curTask = document.querySelector(".is-dragging") as HTMLDivElement;
//       if (!bottomTask) {
//         zone.appendChild(curTask);
//       } else {
//         zone.insertBefore(curTask, bottomTask);
//       }
//     });
//   });
//   const insertAboveTask = (zone, mouseY) => {
//     const els = zone.querySelectorAll(
//       ".boardContainer__main__list__card:not(.is-dragging)"
//     ) as NodeListOf<HTMLDivElement>;
//     let closestTask;
//     let closestOffset = Number.NEGATIVE_INFINITY;
//     els.forEach((task) => {
//       const { top } = task.getBoundingClientRect();
//       const offset = mouseY - top;
//       if (offset < 0 && offset > closestOffset) {
//         closestOffset = offset;
//         closestTask = task;
//       }
//     });
//     return closestTask;
//   };
// };
// column.appendChild(listContainer);
// const dropZones = document.querySelectorAll(".boardContainer__main");
// dropZones.forEach((dropZone) => {
//   dropZone.addEventListener("dragover", function (e) {
//     e.preventDefault();
//     dropZone.classList.add("dragover");
//   });
//   dropZone.addEventListener("dragenter", function (e) {
//     e.preventDefault();
//     dropZone.classList.add("dragover");
//   });
//   dropZone.addEventListener("dragleave", function (e) {
//     dropZone.classList.remove("dragover");
//   });
//   dropZone.addEventListener("drop", function (e) {
//     e.preventDefault();
//     const draggedItemId = e.dataTransfer.getData("text/plain");
//     if (!draggedItemId) {
//       return;
//     }
//     const draggedItem = document.getElementById(draggedItemId) as HTMLElement;
//     draggedItem?.parentElement?.appendChild(
//       dropZone.firstElementChild as HTMLElement
//     );
//     dropZone.appendChild(draggedItem);
//     dropZone.classList.remove("dragover");
//   });
// });
