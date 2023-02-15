"use strict";
exports.__esModule = true;
exports.KanbanAPI = void 0;
var KanbanAPI = /** @class */ (function () {
    function KanbanAPI() {
    }
    KanbanAPI.prototype.getItems = function (listId) {
        var list = readLocalStorage().find(function (list) { return list.id === listId; });
        if (!list) {
            return [];
        }
        return list.items;
    };
    return KanbanAPI;
}());
exports.KanbanAPI = KanbanAPI;
function readLocalStorage() {
    var json = localStorage.getItem("board-data");
    if (!json) {
        return [
            {
                id: 1,
                items: []
            },
            {
                id: 2,
                items: []
            },
            {
                id: 3,
                items: []
            },
        ];
    }
    return JSON.parse(json);
}
function sevelocalStorage(data) {
    localStorage.setItem("board-data", JSON.stringify(data));
}
