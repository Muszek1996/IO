"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ENGINE_1 = require("./ENGINE");
var BABYLON = __importStar(require("babylonjs"));
var SCENE = /** @class */ (function () {
    function SCENE() {
    }
    SCENE.getInstance = function () {
        if (!SCENE.instance) {
            SCENE.instance = new BABYLON.Scene(ENGINE_1.ENGINE.getInstance());
            SCENE.instance.clearColor = new BABYLON.Color4(0.9, 0.9, 0.9);
        }
        return SCENE.instance;
    };
    return SCENE;
}());
exports.SCENE = SCENE;
