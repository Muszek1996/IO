"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var EntityCreator_js_1 = require("./Utils/EntityCreator.js");
var SCENE_1 = require("../Babylon/SCENE");
var CAMERA_1 = require("../Babylon/CAMERA");
var BABYLON = __importStar(require("babylonjs"));
var LEFT = 65; // A
var RIGHT = 68; // D
var UP = 87; // W
var DOWN = 83; // S
var OwnShip = /** @class */ (function () {
    function OwnShip(ship) {
        this.keyFired = {};
        this.pos = ship.pos;
        this.name = ship.name;
        this.meshFile = ship.meshFile;
        EntityCreator_js_1.EntityCreator.create(this);
        //TEMP SHIT
        var scene = SCENE_1.SCENE.getInstance();
        var map = {}; //object for multiple key presses
        scene.actionManager = new BABYLON.ActionManager(scene);
        scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
            map[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
        }));
        scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
            map[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
        }));
        scene.registerAfterRender(function () {
            OwnShip.keyDown[LEFT] = false;
            OwnShip.keyDown[RIGHT] = false;
            OwnShip.keyDown[UP] = false;
            OwnShip.keyDown[DOWN] = false;
            if (map["a"] || map["A"]) {
                OwnShip.keyDown[LEFT] = true;
            }
            if (map["d"] || map["D"]) {
                OwnShip.keyDown[RIGHT] = true;
            }
            if (map["w"] || map["W"]) {
                OwnShip.keyDown[UP] = true;
                console.log("Pressing W");
            }
            if (map["s"] || map["S"]) {
                OwnShip.keyDown[DOWN] = true;
            }
        });
    }
    OwnShip.prototype.applyMovement = function (deltaTime) {
        //console.log(OwnShip.ownShipMesh);
        if (!this.ownShipMesh)
            return;
        var mesh = this.ownShipMesh;
        var contactPoint = mesh.absolutePosition.clone();
        contactPoint.y += 20;
        var force = 2 * deltaTime; // That means a maximum of 20 force / second
        var direction = new BABYLON.Vector3(1, 0, 0).multiplyByFloats(force, force, force);
        if (OwnShip.keyDown[UP]) {
            mesh.applyImpulse(direction, contactPoint);
            console.log("applying ");
        }
        if (OwnShip.keyDown[DOWN]) {
            mesh.applyImpulse(direction.negate(), contactPoint);
        }
        if (OwnShip.keyDown[LEFT]) {
            CAMERA_1.CAMERA.getInstance().position.x -= 0.06;
        }
        if (OwnShip.keyDown[RIGHT]) {
            CAMERA_1.CAMERA.getInstance().position.x += 0.06;
        }
    };
    OwnShip.keyDown = {};
    return OwnShip;
}());
exports.OwnShip = OwnShip;
