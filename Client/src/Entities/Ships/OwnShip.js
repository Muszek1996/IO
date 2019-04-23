"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var EntityDrawer_js_1 = require("../Utils/EntityDrawer.js");
var SCENE_1 = require("../../Babylon/SCENE");
var BABYLON = __importStar(require("babylonjs"));
var Ship_1 = require("./Ship");
var LEFT = 65; // A
var RIGHT = 68; // D
var UP = 87; // W
var DOWN = 83; // S
var OwnShip = /** @class */ (function (_super) {
    __extends(OwnShip, _super);
    function OwnShip(ship) {
        var _this = _super.call(this, ship) || this;
        _this.keyFired = {};
        //TEMP SHIT //TODO temp shit
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
            }
            if (map["s"] || map["S"]) {
                OwnShip.keyDown[DOWN] = true;
            }
        });
        return _this;
    }
    OwnShip.prototype.applyMovement = function (deltaTime) {
        //console.log(OwnShip.ownShipMesh);
        if (!this.mesh)
            return;
        var mesh = this.mesh;
        var contactPoint = mesh.absolutePosition.clone();
        contactPoint.y += 30;
        //contactPoint.x +=150;
        var force = 0.2 * deltaTime; // That means a maximum of 20 force / second
        function getForwardVector(_mesh) {
            _mesh.computeWorldMatrix(true);
            var forward_local = new BABYLON.Vector3(1, 0, 0);
            var worldMatrix = _mesh.getWorldMatrix();
            return BABYLON.Vector3.TransformNormal(forward_local, worldMatrix);
        }
        var forward = getForwardVector(this.mesh);
        contactPoint = contactPoint.add(forward.multiplyByFloats(100, 0, 100)); // Move contact point to front of ship;
        if (OwnShip.keyDown[UP]) {
            this.mesh.applyImpulse(forward.multiplyByFloats(force, force, force), contactPoint);
            var lines = BABYLON.Mesh.CreateLines("lines", [contactPoint, contactPoint.add(forward.multiplyByFloats(10 * force, force, 10 * force))], SCENE_1.SCENE.getInstance());
            var contact = BABYLON.Mesh.CreateSphere("vectorStartingPoint", 3, 1, SCENE_1.SCENE.getInstance());
            contact.position = contactPoint;
            lines.color = new BABYLON.Color3(1, 0, 0);
        }
        if (OwnShip.keyDown[DOWN]) {
            this.mesh.applyImpulse(forward.negate().multiplyByFloats(force, force, force), contactPoint);
        }
        if (OwnShip.keyDown[LEFT]) {
            this.mesh.applyImpulse(this.mesh.forward.multiplyByFloats(force * 0.1, force * 0.1, force * 0.1).negate(), contactPoint);
        }
        if (OwnShip.keyDown[RIGHT]) {
            this.mesh.applyImpulse(this.mesh.forward.multiplyByFloats(force * 0.1, force * 0.1, force * 0.1), contactPoint);
        }
    };
    OwnShip.prototype.draw = function () {
        EntityDrawer_js_1.EntityDrawer.create(this, function (mesh) {
            //CAMERA.getInstance().lockedTarget = mesh;
            console.log("it's fired from super");
        });
    };
    OwnShip.keyDown = {};
    return OwnShip;
}(Ship_1.Ship));
exports.OwnShip = OwnShip;
