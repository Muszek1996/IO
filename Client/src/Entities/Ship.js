"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EntityCreator_js_1 = require("./Utils/EntityCreator.js");
var Ship = /** @class */ (function () {
    function Ship(pos, meshFile, name) {
        this.pos = pos;
        new EntityCreator_js_1.EntityCreator(pos, meshFile, name);
    }
    return Ship;
}());
exports.Ship = Ship;
