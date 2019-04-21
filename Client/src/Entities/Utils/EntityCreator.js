"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SCENE_1 = require("../../Babylon/SCENE");
var EntityCreator = /** @class */ (function () {
    function EntityCreator() {
    }
    EntityCreator.create = function (ship) {
        BABYLON.SceneLoader.ImportMesh([ship.name], "scenes/", ship.meshFile, SCENE_1.SCENE.getInstance(), function (meshes) {
            console.log(meshes);
            ship.ownShipMesh = meshes[0];
            meshes[0].position = new BABYLON.Vector3(ship.pos.x, ship.pos.y, ship.pos.z);
        });
    };
    return EntityCreator;
}());
exports.EntityCreator = EntityCreator;
