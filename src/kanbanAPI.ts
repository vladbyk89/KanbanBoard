const formList = document.getElementById("todo-form") as HTMLFormElement;
const input = document.getElementById("todo-input") as HTMLInputElement;
const todoLane = document.getElementById("todo-lane") as HTMLElement;
const rootList: HTMLHeadingElement | null = document.querySelector("#rootList");

renderBoardInBoardPage();

backToMainBtn.addEventListener(
  "click",
  () => (window.location.href = "index.html")
);

formList.addEventListener("submit", (e) => {
  e.preventDefault();

  if (rootList) {
    rootList.innerHTML += ` <div class="boardContainer__main__list swim-lane" draggable="true">
    <div class="boardContainer__main__list__header">
    <h3 contenteditable>${input.value}</h3>
    <i class="fa-solid fa-ellipsis"></i>
    </div>
    <div class="boardContainer__main__list__card__addCard" >
    <form todo-form>
      <input type="text" placeholder="Add New Card" id="todo-input">
      <button type="submit" class="addCardBtn">
        <i class="fa-solid fa-plus">Add Card</i>
      </form>
    </button>
  </div>
    <div class="boardContainer__main__list__card task p1">
      <p class="p1" draggable="true">Create Element</p>
      <i class="fa-regular fa-pen-to-square p1"></i>
    </div>
    <div class="boardContainer__main__list__card task p1">
      <p class="p1" draggable="true">Create Element</p>
      <i class="fa-regular fa-pen-to-square p1"></i>
    </div>
    <div class="boardContainer__main__list__card task p1">
      <p class="p1" draggable="true">Create Element</p>
      <i class="fa-regular fa-pen-to-square p1"></i>
    </div>
    <div class="boardContainer__main__list__card task" id="todo-lane">
      <p class="p1" draggable="true">Buy Itay Chocolate</p>
      <i class="fa-regular fa-pen-to-square"></i>
    </div>
    <div class="boardContainer__main__list__card task" id="todo-lane">
      <p class="p1" draggable="true">Something else...</p>
      <i class="fa-regular fa-pen-to-square"></i>
    </div>
  </div>`;
  }
  // else{
  //   if(!formList && input.value){
  //     return ;
  //   }
  // }
  e.stopImmediatePropagation();
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
});

// const formTask = document.querySelector("#todo-formTask");
// const addTask = document.querySelector("#addTask");
// addTask.addEventListener("submit", (e) => {
//   e.preventDefault();
//   if (addTask) {
//     rootTask.innerHTML += `<div class="boardContainer__main__list__card task p1">
//     <p class="p1" draggable="true">Create Element</p>
//     <i class="fa-regular fa-pen-to-square p1"></i>
//   </div>`;

//   }
// });
const addTask = document.getElementById("#Listrender");
const formTask = document.getElementById("#lolo") as HTMLElement;

formTask.addEventListener("submit", (e) => {
  e.preventDefault();
  e.stopImmediatePropagation();
  if (addTask) {
    addTask.innerHTML = `<div class="boardContainer__main__list__card task p1">
    <p class="p1" draggable="true">Create lol</p>
    <i class="fa-regular fa-pen-to-square p1"></i>
  </div>`;
  }
});

//חסר לתפוס איפות
//
