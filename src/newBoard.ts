let cards: NodeListOf<HTMLDivElement>;

boardContainer.addEventListener("dragover", (e) => {
  let cardIsDragged = false;
  cards.forEach((card) => {
    if (card.classList.contains("is-dragging")) {
      cardIsDragged = true;
    }
  });

  if (cardIsDragged) return;
  e.preventDefault();

  const leftList = insertLeftOfLisk(boardContainer, e.clientX);
  const curList = boardContainer.querySelector(".is-draggin") as HTMLElement;

  if (!leftList) {
    boardContainer.appendChild(curList);
  } else {
    boardContainer.insertBefore(curList, leftList);
  }
});

const insertLeftOfLisk = (zone: HTMLElement, mouseX: number) => {
  const staticLists = zone.querySelectorAll(
    ".boardContainer__main__list:not(.is-dragging)"
  );

  let closestTask: null | Element = null;
  let closestOffset = Number.NEGATIVE_INFINITY;

  staticLists.forEach((list) => {
    const cardBoundaries = list.getBoundingClientRect();

    const offset = mouseX - cardBoundaries.left - cardBoundaries.width / 2;

    if (offset < 0 && offset > closestOffset) {
      closestOffset = offset;
      closestTask = list;
    }
  });

  return closestTask;
};

const insertAboveTask = (zone, mouseY) => {
  const staticCards = zone.querySelectorAll(
    ".boardContainer__main__list__card:not(.is-dragging)"
  );

  let closestTask = null;
  let closestOffset = Number.NEGATIVE_INFINITY;

  staticCards.forEach((card) => {
    const cardBoundaries = card.getBoundingClientRect();

    const offset = mouseY - cardBoundaries.top - cardBoundaries.height / 2;

    if (offset < 0 && offset > closestOffset) {
      closestOffset = offset;
      closestTask = card;
    }
  });

  return closestTask;
};

function createListElement(list: List) {
  const listContainer = document.createElement("div");
  listContainer.classList.add("boardContainer__main__list");
  listContainer.setAttribute("draggable", "true");
  listContainer.setAttribute("id", `${list.uid}`);

  const header = document.createElement("div");
  header.classList.add("boardContainer__main__list__header");
  header.setAttribute("id", `${list.name}_header`);
  header.innerHTML = `
  <div class="listTitle" >
    <h2>${list.name}</h2>
    <i class="fa-regular fa-pen-to-square editListBtn"></i>
    </div>
    <div class="boardContainer__main__list__card--addCard">
      <textarea maxlength="30" class="newCardTextArea" cols="30" rows="3"></textarea>
      <button class="newCardBtn">New Card</button>
    </div>
  `;

  listContainer.appendChild(header);

  listContainer.addEventListener("dragstart", () => {
    listContainer.classList.add("is-draggin");
  });
  listContainer.addEventListener("dragend", () => {
    listContainer.classList.remove("is-draggin");
  });

  listContainer.addEventListener("dragover", (e) => {
    let cardIsDragged = false;
    cards.forEach((card) => {
      if (card.classList.contains("is-dragging")) {
        cardIsDragged = true;
      }
    });
    if (!cardIsDragged) return;
    e.preventDefault();

    const bottomTask = insertAboveTask(listContainer, e.clientY);
    const curTask = document.querySelector(".is-dragging") as HTMLElement;

    if (!bottomTask) {
      listContainer.appendChild(curTask);
    } else {
      listContainer.insertBefore(curTask, bottomTask);
    }
  });

  boardContainer.append(listContainer);
  return listContainer;
}

function createNewCard(cardName: string, list: Element) {
  const card = document.createElement("div");
  card.classList.add("boardContainer__main__list__card");
  card.setAttribute("draggable", "true");
  card.innerHTML = `
  <p>${cardName}</p>
  <i class="fa-regular fa-pen-to-square editCardBtn"></i>
  `;
  const cardTitle = list.querySelector(
    ".boardContainer__main__list__header"
  ) as HTMLDivElement;
  list.insertBefore(card, cardTitle.nextSibling);
  card.addEventListener("dragstart", () => {
    card.classList.add("is-dragging");
  });
  card.addEventListener("dragend", () => {
    card.classList.remove("is-dragging");
  });
  // Add new card to cards variable
  cards = document.querySelectorAll(
    ".boardContainer__main__list__card"
  ) as NodeListOf<HTMLDivElement>;
}

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
