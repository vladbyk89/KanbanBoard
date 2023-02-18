const formCard = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoLane = document.getElementById("todo-lane");
const title: HTMLHeadingElement | null = document.querySelector("#title");

renderBoard();

backToMainBtn.addEventListener(
  "click",
  () => (window.location.href = "index.html")
);

formCard.addEventListener("submit", (e) => {
  e.preventDefault();
  if (title) {
    title.innerHTML = ` <div class="boardContainer__main__list swim-lane" draggable="true">
    <div class="boardContainer__main__list__header">
      <h3 contenteditable>Done</h3>
      <i class="fa-solid fa-ellipsis"></i>
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
