import {EntityDrawer} from '../Utils/EntityDrawer.js'
import {SCENE} from "../../Babylon/SCENE";
import {CAMERA} from "../../Babylon/CAMERA";
import * as BABYLON from "babylonjs";
import {Ship} from "./Ship";

const LEFT: number = 65; // A
const RIGHT: number = 68; // D
const UP: number = 87; // W
const DOWN: number = 83; // S

export class OwnShip extends Ship {

    public static keyDown: object = {};
    public keyFired: object = {};

    constructor(ship){
        super(ship);
        CAMERA.getInstance().
        //TEMP SHIT
        let scene = SCENE.getInstance();

        let map ={}; //object for multiple key presses
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


            if(map["a"] || map["A"]){
                OwnShip.keyDown[LEFT]=true;
            }
            if(map["d"] || map["D"]){
                OwnShip.keyDown[RIGHT]=true;
            }
            if(map["w"] || map["W"]){
                OwnShip.keyDown[UP]=true;
                console.log("Pressing W");
            }
            if(map["s"] || map["S"]){
                OwnShip.keyDown[DOWN]=true;
            }

        })

    }

    public applyMovement(deltaTime: number): void{
        //console.log(OwnShip.ownShipMesh);
        if(!this.mesh)return;
        let mesh =  this.mesh;
        let contactPoint: BABYLON.Vector3 = mesh.absolutePosition.clone();
        contactPoint.y += 20;
        let force: number = 2 * deltaTime;  // That means a maximum of 20 force / second
        let direction: BABYLON.Vector3 = new BABYLON.Vector3(1,0,0).multiplyByFloats(force, force, force);
        if(OwnShip.keyDown[UP]){
            mesh.applyImpulse(direction, contactPoint);
            console.log("applying ")
        }
        if(OwnShip.keyDown[DOWN]){
            mesh.applyImpulse(direction.negate(), contactPoint);
        }
        if(OwnShip.keyDown[LEFT]){
          CAMERA.getInstance().position.x -= 0.06;
        }
        if(OwnShip.keyDown[RIGHT]){
          CAMERA.getInstance().position.x += 0.06;
        }
    }

}


