import {SCENE} from "./Babylon/SCENE";

export class Light{
    light: BABYLON.Light;
    lightMaterial: BABYLON.StandardMaterial;
    scene;
    constructor() {
        this.scene = SCENE.getInstance();
        this.light = new BABYLON.PointLight("omni", new BABYLON.Vector3(1111,1111,1111),this.scene);
        this.lightMaterial = new BABYLON.StandardMaterial("std",this.scene);
        this.lightMaterial.diffuseColor = new BABYLON.Color3(1,0,0);

    }

}
