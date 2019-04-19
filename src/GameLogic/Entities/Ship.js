"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var Position_1 = __importDefault(require("../Utils/Position"));
var Ship = /** @class */ (function () {
    function Ship(x, z, y, name) {
        if (y === void 0) { y = 0; }
        if (name === void 0) { name = "defaultShip"; }
        this.pos = new Position_1.default(x, z, y);
        this.name = name;
    }
    return Ship;
}());
module.exports = { Ship: Ship };
//TODO SOME SHIP/ENTITY CREATOR AND TROUGH SOCKET SENDER
