function createNewColumn(list: List) {
  const column = document.createElement("div");
  column.classList.add("boardContainer__main__column");

  const listContainer = document.createElement("div");
  listContainer.classList.add("boardContainer__main__column__list");
  listContainer.setAttribute("draggable", "true");
  listContainer.setAttribute("id", `${list.name}_container`);
  listContainer.addEventListener("dragstart", function (e) {
    e.dataTransfer?.setData("text/plain", e.target?.id);
  });

  const header = document.createElement("div");
  header.classList.add("boardContainer__main__column__list__header");
  header.setAttribute("id", `${list.name}_header`);
  header.innerHTML = `
  <div class="listTitle">
    <h2>${list.name}</h2>
    <i class="fa-regular fa-pen-to-square editListBtn"></i>
    </div>
    <div class="boardContainer__main__column__list__card--addCard">
      <textarea maxlength="30" class="newCardTextArea" cols="30" rows="3"></textarea>
      <button class="newCardBtn">New Card</button>
    </div>
  `;

  listContainer.appendChild(header);
  column.appendChild(listContainer);

  const dropZones = document.querySelectorAll(".boardContainer__main__column");
  dropZones.forEach((dropZone) => {
    dropZone.addEventListener("dragover", function (e) {
      e.preventDefault();
      dropZone.classList.add("dragover");
    });

    dropZone.addEventListener("dragenter", function (e) {
      e.preventDefault();
      dropZone.classList.add("dragover");
    });

    dropZone.addEventListener("dragleave", function (e) {
      dropZone.classList.remove("dragover");
    });

    dropZone.addEventListener("drop", function (e) {
      e.preventDefault();
      const draggedItemId = e.dataTransfer.getData("text/plain");
      if (!draggedItemId) {
        return;
      }
      const draggedItem = document.getElementById(draggedItemId) as HTMLElement;
      draggedItem?.parentElement?.appendChild(
        dropZone.firstElementChild as HTMLElement
      );

      dropZone.appendChild(draggedItem);
      dropZone.classList.remove("dragover");
    });
  });

  return column;
}

const cardMovement = () => {
  const grabCard = document.querySelectorAll(
    ".boardContainer__main__column__list__card"
  );
  const drappables = document.querySelectorAll(
    ".boardContainer__main__column__list"
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
      ".boardContainer__main__column__list__card:not(.is-dragging)"
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
};

function createNewCard(cardName: string, list: Element) {
  const card = document.createElement("div");
  card.classList.add("boardContainer__main__column__list__card");
  card.setAttribute("draggable", "true");
  card.innerHTML = `
  <p>${cardName}</p>
  <i class="fa-regular fa-pen-to-square editCardBtn"></i>
  `;
  card.addEventListener("dragstart", cardMovement);
  const cardTitle = list.querySelector(
    ".boardContainer__main__column__list__header"
  ) as HTMLDivElement;
  list.insertBefore(card, cardTitle.nextSibling);
}
