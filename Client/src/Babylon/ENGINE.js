"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var BABYLON = __importStar(require("babylonjs"));
var ENGINE = /** @class */ (function () {
    function ENGINE() {
    }
    ENGINE.getInstance = function () {
        if (!ENGINE.instance) {
            ENGINE.instance = new BABYLON.Engine(document.getElementById("renderCanvas"), true);
        }
        return ENGINE.instance;
    };
    return ENGINE;
}());
exports.ENGINE = ENGINE;
