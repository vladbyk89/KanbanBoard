export class KanbanAPI {
    constructor() {}
    public getItems(listId) {
      const list = readLocalStorage().find((list) => list.id === listId);
      if (!list) {
        return [];
      }
      return list.items;
    }
  }
  function readLocalStorage() {
    const json = localStorage.getItem("board-data");
    if (!json) {
      return [
        {
          id: 1,
          items: [],
        },
        {
          id: 2,
          items: [],
        },
        {
          id: 3,
          items: [],
        },
      ];
    }
    return JSON.parse(json);
  }
  
  function sevelocalStorage(data) {
    localStorage.setItem("board-data", JSON.stringify(data));
  }
  