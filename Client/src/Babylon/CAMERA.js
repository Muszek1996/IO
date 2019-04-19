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
var SCENE_1 = require("./SCENE");
var CAMERA = /** @class */ (function () {
    function CAMERA() {
    }
    CAMERA.getInstance = function () {
        if (!CAMERA.instance) {
            CAMERA.instance = new BABYLON.FreeCamera("mainCamera", BABYLON.Vector3.Zero(), SCENE_1.SCENE.getInstance(), true);
            CAMERA.instance.attachControl(document.getElementById("renderCanvas"));
        }
        return CAMERA.instance;
    };
    return CAMERA;
}());
exports.CAMERA = CAMERA;
