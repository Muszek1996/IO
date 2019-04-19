"use strict";
var Position_1 = require("./Position");
var Ship = /** @class */ (function () {
    function Ship(x, z, y, name) {
        if (y === void 0) { y = 0; }
        if (name === void 0) { name = "defaultShip"; }
        this.pos = new Position_1.Position(x, z, y);
        this.name = name;
    }
    return Ship;
}());
module.exports = Ship;
//# sourceMappingURL=Ship.js.map