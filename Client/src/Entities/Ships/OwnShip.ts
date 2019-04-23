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


        //TEMP SHIT //TODO temp shit
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
        contactPoint.y +=30;
        //contactPoint.x +=150;
        let force: number = 0.2 * deltaTime;  // That means a maximum of 20 force / second


        function getForwardVector(_mesh) {   //Translate local Vector Forward to global vector;
            _mesh.computeWorldMatrix(true);
            var forward_local = new BABYLON.Vector3(1, 0, 0);
            let worldMatrix = _mesh.getWorldMatrix();
            return BABYLON.Vector3.TransformNormal(forward_local, worldMatrix);
        }

        let forward = getForwardVector(this.mesh);
        contactPoint = contactPoint.add(forward.multiplyByFloats(100,0,100)); // Move contact point to front of ship;

        if(OwnShip.keyDown[UP]){
            this.mesh.applyImpulse(forward.multiplyByFloats(force,force,force),contactPoint);
            var lines = BABYLON.Mesh.CreateLines("lines", [contactPoint,contactPoint.add(forward.multiplyByFloats(10*force,force,10*force))], SCENE.getInstance());
            var contact = BABYLON.Mesh.CreateSphere("vectorStartingPoint",3,1,SCENE.getInstance());
            contact.position = contactPoint;
            lines.color = new BABYLON.Color3(1, 0, 0);
        }

        if(OwnShip.keyDown[DOWN]){
            this.mesh.applyImpulse(forward.negate().multiplyByFloats(force,force,force), contactPoint);
        }
        if(OwnShip.keyDown[LEFT]){
            this.mesh.applyImpulse(this.mesh.forward.multiplyByFloats(force*0.1, force*0.1, force*0.1).negate(),contactPoint);
        }
        if(OwnShip.keyDown[RIGHT]){
            this.mesh.applyImpulse(this.mesh.forward.multiplyByFloats(force*0.1, force*0.1, force*0.1),contactPoint);
        }
    }
    draw(){
        EntityDrawer.create(this,function(mesh){
            //CAMERA.getInstance().lockedTarget = mesh;
            console.log("it's fired from super");
        });
    }
}


