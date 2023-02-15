// "use strict";
// import type * as KanbanAPI from "./api/dist/KanbanAPI";

// console.log(KanbanAPI.getitems(1));

profileBtn.addEventListener(
  "click",
  () => (profileWindow.style.display = "flex")
);

backToMain.addEventListener(
  "click",
  () => (profileWindow.style.display = "none")
);
