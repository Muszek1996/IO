import * as BABYLON from "babylonjs";
import {SCENE} from './SCENE'

export class CAMERA{
    public static instance: BABYLON.Camera;

    static getInstance(): BABYLON.Camera{
        if(!CAMERA.instance){
            CAMERA.instance = new BABYLON.FollowCamera("mainCamera", BABYLON.Vector3.Zero(), SCENE.getInstance())
            CAMERA.instance.attachControl(<HTMLCanvasElement>document.getElementById("renderCanvas"));
        }
        return CAMERA.instance;
    }
/*
    static addCamera(): void{
        SCENE.getInstance()
    }*/
}
