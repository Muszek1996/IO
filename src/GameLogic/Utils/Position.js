"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Position = /** @class */ (function () {
    function Position(x, z, y) {
        this.x = x;
        this.y = y;
        this.z = z;
        this._directionX = 0;
        this._directionY = 0;
        this._directionZ = 0;
    }
    return Position;
}());
exports.default = Position;
