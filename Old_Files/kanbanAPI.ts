// renderBoardInBoardPage();

// backToMainBtn.addEventListener("click", () => {
//   localStorage.removeItem("currentBoard");
//   window.location.href = "index.html";
// });

function movement() {
  const grabCard = document.querySelectorAll(".task");
  const drappables = document.querySelectorAll(".swim-lane");
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
      e.preventDefault();
      const bottomTask = insertAboveTask(zone, e.clientY); //e.screenY //pageY
      const curTask: any = document.querySelector(".is-dragging");
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
      const { top } = task.getBoundingClientRect();
      const offset = mouseY - top;
      if (offset < 0 && offset > closestOffset) {
        closestOffset = offset;
        closestTask = task;
      }
    });
    return closestTask;
  };

  const value = input.value;
  if (!value) return;
  const newTask = document.createElement("p");
  newTask.classList.add("task");
  newTask.setAttribute("draggable", "true");
  newTask.innerText = value;
  newTask.addEventListener("dragstart", () => {
    newTask.classList.add("is-dragging");
  });
  newTask.addEventListener("dragend", () => {
    newTask.classList.remove("is-dragging");
  });
  todoLane.appendChild(newTask);
  input.value = "";
}

const formList = document.getElementById("todo-form") as HTMLFormElement;
const input = document.getElementById("todo-input") as HTMLInputElement;
const rootList: HTMLHeadingElement | null = document.querySelector("#rootList");

formList.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(rootList);
  if (rootList) {
    const indexValue = rootList.childElementCount + 1;
    rootList.innerHTML += `<div class="boardContainer__main__list swim-lane" draggable="true">
    <div class="boardContainer__main__list__header">
    <h3 contenteditable>${input.value}</h3>
    <i class="fa-solid fa-ellipsis"></i>
    </div>
    <div class="boardContainer__main__list__card__addCard" >
    <form id="formList" onsubmit="return fixture(${indexValue})">
    <input type="text" placeholder="Add New Card" id="addTask_${indexValue}">
    <button id="addCardBtn">
    <i class="fa-solid fa-plus">Add Card</i>
    </button>
    </form>
    </div>
    <div id="rootTask_${indexValue}"></div>
  `;
  }
  input.value = "";
  movement();
  fixture;
});

const fixture = (indexValue) => {
  const rootTask = document.querySelector(`#rootTask_${indexValue}`);
  const todo_input = document.getElementById(
    `addTask_${indexValue}`
  ) as HTMLInputElement;
  console.log(todo_input);
  if (rootTask) {
    rootTask.innerHTML += `<div class="boardContainer__main__list__card task p1">
          <p class="p1" draggable="true">${todo_input.value}</p>
          <i class="fa-regular fa-pen-to-square p1"></i>
        </div>`;
  }
  movementList();
  movement();
  input.value = "";
  return false;
};


function movementList() {
  const grabCard = document.querySelectorAll(".swim-lane");
  const drappables = document.querySelectorAll(".boardContainer__main");swim-lane
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
      e.preventDefault();
      const bottomTask = insertAboveTask(zone, e.clientY); //e.screenY //pageY
      const curTask: any = document.querySelector(".is-dragging");
      if (!bottomTask) {
        zone.appendChild(curTask);
      } else {
        zone.insertBefore(curTask, bottomTask);
      }
    });
  });