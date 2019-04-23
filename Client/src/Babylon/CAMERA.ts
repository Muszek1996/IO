import * as BABYLON from "babylonjs";
import {SCENE} from './SCENE'

export class CAMERA{
    public static instance: BABYLON.FreeCamera;

    static getInstance(): BABYLON.FreeCamera{
        if(!CAMERA.instance){
            CAMERA.instance = new BABYLON.FreeCamera("mainCamera", new BABYLON.Vector3(-162,100,0), SCENE.getInstance());
            CAMERA.instance.attachControl(<HTMLCanvasElement>document.getElementById("renderCanvas"), true);

            CAMERA.instance.rotation.y = Math.PI/2;
            CAMERA.instance.rotation.x = 0.1;

            // //The goal distance of camera from target
            // CAMERA.instance.radius = 450;
            //
            // // The goal height of camera above local origin (centre) of target
            // CAMERA.instance.heightOffset = 70;
            //
            // // The goal rotation of camera around local origin (centre) of target in x y plane
            // CAMERA.instance.rotationOffset = 270;
            //
            // //Acceleration of camera in moving from current to goal position
            // CAMERA.instance.cameraAcceleration = 1;
            //
            // //The speed at which acceleration is halted
            // CAMERA.instance.maxCameraSpeed = 10;

            //camera.target is set after the target's creation

            // This attaches the camera to the canvas


        }
        return CAMERA.instance;
    }

}
