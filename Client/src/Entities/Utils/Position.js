"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Position = /** @class */ (function () {
    function Position(x, z, y) {
        if (y === void 0) { y = 0; }
        this.pos = new BABYLON.Vector3(x, y, z);
    }
    return Position;
}());
exports.Position = Position;
//TODO typescript
