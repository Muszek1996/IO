import * as BABYLON from "babylonjs";

export class ENGINE{
    public static instance: BABYLON.Engine;

    static getInstance(): BABYLON.Engine{
        if(!ENGINE.instance){
            ENGINE.instance = new BABYLON.Engine(<HTMLCanvasElement>document.getElementById("renderCanvas"),true);
        }
        return ENGINE.instance;
    }

    private constructor(){

    }

}




