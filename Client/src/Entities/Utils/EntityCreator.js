"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SCENE_1 = require("../../Babylon/SCENE");
var EntityCreator = /** @class */ (function () {
    function EntityCreator(pos, meshFile, name) {
        this.name = name;
        this.pos = pos;
        var assetsManager = new BABYLON.AssetsManager(SCENE_1.SCENE.getInstance());
        var meshTask = assetsManager.addMeshTask("skull task", name, "scenes/", meshFile);
        meshTask.onSuccess = function (task) {
            task.loadedMeshes[0].name = name;
            task.loadedMeshes[0].position = new BABYLON.Vector3(pos.x, pos.y, pos.z);
        };
        meshTask.onError = function (task, message, exception) {
            console.log(message, exception);
        };
        assetsManager.load();
    }
    return EntityCreator;
}());
exports.EntityCreator = EntityCreator;
