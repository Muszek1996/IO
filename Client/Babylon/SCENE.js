"use strict";
exports.__esModule = true;
var ENGINE_1 = require("./ENGINE");
var BABYLON = require("babylonjs");
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
