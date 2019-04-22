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
        contactPoint.y += 50;
        let force: number = 0.2 * deltaTime;  // That means a maximum of 20 force / second
        let directionUP: BABYLON.Vector3 = new BABYLON.Vector3(1,0,0).multiplyByFloats(force, force, force);
        let directionDOWN: BABYLON.Vector3 = new BABYLON.Vector3(-1,0,0).multiplyByFloats(force, force, force);
        let directionLEFT: BABYLON.Vector3 = new BABYLON.Vector3(0,0,1).multiplyByFloats(force, force, force);
        let directionRIGHT: BABYLON.Vector3 = new BABYLON.Vector3(0,0,-1).multiplyByFloats(force, force, force);

        let rotaton = new BABYLON.Vector3(this.mesh.rotationQuaternion.x, this.mesh.rotationQuaternion.y, this.mesh.rotationQuaternion.z);

        let yRotation = this.mesh.rotationQuaternion.y;

        let x = Math.cos(yRotation)-Math.sin(yRotation);
        let z = Math.cos(yRotation)+Math.sin(yRotation);


        if(OwnShip.keyDown[UP]){
            console.log("RotationOfShip:");
            console.log(this.mesh);
            this.mesh.applyImpulse(directionUP, contactPoint);
            var axisX = BABYLON.Mesh.CreateLines("axisX", [
                contactPoint, new BABYLON.Vector3(contactPoint.x+x,contactPoint.y,contactPoint.z+z)
            ], SCENE.getInstance());
            var contact = BABYLON.Mesh.CreateSphere("vectorStartingPoint",12,10,SCENE.getInstance());
            axisX.color = new BABYLON.Color3(1, 0, 0);


        }

        if(OwnShip.keyDown[DOWN]){
            this.mesh.applyImpulse(directionDOWN, contactPoint);
        }
        if(OwnShip.keyDown[LEFT]){
            this.mesh.applyImpulse(directionLEFT, contactPoint);
        }
        if(OwnShip.keyDown[RIGHT]){
            this.mesh.applyImpulse(directionRIGHT, contactPoint);
        }
    }

}


