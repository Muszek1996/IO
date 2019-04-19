"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
//import Position from "../Utils/Position"
var BABYLON = __importStar(require("babylonjs"));
var Ship = /** @class */ (function () {
    function Ship(x, z, y, name) {
        if (y === void 0) { y = 0; }
        if (name === void 0) { name = "defaultShip"; }
        this.pos = new BABYLON.Vector3(x, y, z);
        this.name = name;
    }
    return Ship;
}());
module.exports = { Ship: Ship };
//TODO SOME SHIP/ENTITY CREATOR AND TROUGH SOCKET SENDER
