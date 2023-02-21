function createNewColumn(list: List) {
  const column = document.createElement("div");
  column.classList.add("boardContainer__mainNew__column");
  column.innerHTML = `
  <div class="boardContainer__mainNew__column__list" draggable="true">
  <div class="boardContainer__mainNew__column__list__header">
    <h2>${list.name}</h2>
    <div class="boardContainer__mainNew__column__list__card--addCard">
      <textarea maxlength="30" class="newCardTextArea" cols="30" rows="3"></textarea>
      <button class="newCardBtn">New Card</button>
    </div>
  </div>

  </div>`;

  return column;
}

function createNewCard(cardName: string, list: Element) {
  const card = document.createElement("div");
  card.classList.add("boardContainer__mainNew__column__list__card");
  card.setAttribute("draggable", "true");
  card.innerHTML = `
  <p>${cardName}</p>
  <i class="fa-regular fa-pen-to-square p1"></i>
  `;
  const cardTitle = list.querySelector(
    ".boardContainer__mainNew__column__list__header"
  ) as HTMLDivElement;
  list.insertBefore(card, cardTitle.nextSibling);
}

window.addEventListener("click", () => {
  const grabCard = document.querySelectorAll(
    ".boardContainer__mainNew__column__list__card"
  );
  const drappables = document.querySelectorAll(
    ".boardContainer__mainNew__column__list"
  );
  grabCard.forEach((task) => {
    task.addEventListener("dragstart", () => {
      task.classList.add("is-dragging");
    });
    task.addEventListener("dragend", () => {
      task.classList.remove("is-dragging");
    });
  });

  drappables.forEach((zone) => {
    zone.addEventListener("dragover", (e) => {
      // e.preventDefault();
      console.log(e);
      const bottomTask = insertAboveTask(zone, e.clientY); //e.screenY //pageY
      const curTask = document.querySelector(".is-dragging") as HTMLDivElement;
      if (!bottomTask) {
        zone.appendChild(curTask);
      } else {
        zone.insertBefore(curTask, bottomTask);
      }
    });
  });

  const insertAboveTask = (zone, mouseY) => {
    const els = zone.querySelectorAll(
      ".boardContainer__mainNew__column__list__card:not(.is-dragging)"
    ) as NodeListOf<HTMLDivElement>;
    let closestTask;
    let closestOffset = Number.NEGATIVE_INFINITY;
    els.forEach((task) => {
      const { top } = task.getBoundingClientRect();
      const offset = mouseY - top;
      if (offset < 0 && offset > closestOffset) {
        closestOffset = offset;
        closestTask = task;
      }
    });
    return closestTask;
  };
});

// window.addEventListener("click", () => {
//   const grabCard = document.querySelectorAll(".boardContainer__mainNew__column__list");
//   const drappables = document.querySelectorAll(".boardContainer__mainNew__column");
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
//       e.preventDefault();
//       const bottomTask = insertAboveTask(zone, e.clientY); //e.screenY //pageY
//       const curTask: any = document.querySelector(".is-dragging");
//       if (!bottomTask) {
//         zone.appendChild(curTask);
//       } else {
//         zone.insertBefore(curTask, bottomTask);
//       }
//     });
//   });

//   const insertAboveTask = (zone, mouseY) => {
//     const els = zone.querySelectorAll(".boardContainer__mainNew__column:not(.is-dragging)");
//     let closestTask = null;
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
// });
