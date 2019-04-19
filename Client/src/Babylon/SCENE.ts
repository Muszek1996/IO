import {ENGINE} from './ENGINE'
import * as BABYLON from "babylonjs";

export class SCENE{
   public static instance: BABYLON.Scene;

    static getInstance(): BABYLON.Scene{
        if(!SCENE.instance){
            SCENE.instance = new BABYLON.Scene(ENGINE.getInstance());
            SCENE.instance.clearColor = new BABYLON.Color4(0.9,0.9,0.9);
        }

        return SCENE.instance;
    }

    private constructor(){

    }

}




