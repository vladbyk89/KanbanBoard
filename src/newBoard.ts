const mainContaier = document.querySelector(
  ".boardContainer__main"
) as HTMLDivElement;

const addListBtn = document.querySelector("#addListBtn") as HTMLButtonElement;

const newListInput = document.querySelector(
  "#newListInput"
) as HTMLInputElement;

const newCardButtons = document.querySelectorAll(
  ".newCardBtn"
) as NodeListOf<HTMLButtonElement>;

window.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  if (target.className === "newCardBtn") {
    const listElement = target.closest(
      ".boardContainer__main__column__list"
    ) as HTMLDivElement;
    console.log(listElement);
    const listHeader = document.querySelector(
        ".boardContainer__main__column__list__header"
      ) as HTMLHeadElement;
    
      console.log(listHeader);
    const newCardName = target.parentNode?.querySelector(
      ".newCardTextArea"
    ) as HTMLTextAreaElement;
    createNewCard(newCardName.value, listElement);
  }
});

addListBtn.addEventListener("click", () => {
  console.log(newListInput.value);
  createNewColumn(newListInput.value);
});

function createNewColumn(listName: string) {
  const column = document.createElement("div");
  column.classList.add("boardContainer__main__column");
  column.innerHTML = `
  <div class="boardContainer__main__column__list" draggable="true">
  <div class="boardContainer__main__column__list__header">
    <h2>${listName}</h2>

  </div>
    <div
      class="boardContainer__main__column__list__card"
      draggable="true"
    >
      <p>Task 2</p>
      <i class="fa-regular fa-pen-to-square p1"></i>
    </div>
    <div
      class="boardContainer__main__column__list__card"
      draggable="true"
    >
      <p>Long Text task to test look</p>
      <i class="fa-regular fa-pen-to-square p1"></i>
    </div>
    <div class="boardContainer__main__column__list__card--addCard">
      <textarea maxlength="30" class="newCardTextArea" cols="30" rows="3"></textarea>
      <button class="newCardBtn">New Card</button>
    </div>
  </div>`;
  mainContaier.append(column);
}

function createNewCard(cardName: string, list: Element) {
  const card = document.createElement("div");
  card.classList.add("boardContainer__main__column__list__card");
  card.setAttribute("draggable", "true");
  card.innerHTML = `
  <p>${cardName}</p>
  <i class="fa-regular fa-pen-to-square p1"></i>
  `;
//   list.insertBefore(listHeader, card);
}

