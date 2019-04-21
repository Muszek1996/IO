import {SCENE} from "./Babylon/SCENE";

export class SkyBox {
    skyBoxMesh: BABYLON.Mesh;
    skyBoxMaterial: BABYLON.StandardMaterial;
    scene: BABYLON.Scene;

    constructor(){
        this.scene = SCENE.getInstance();
        this.skyBoxMesh = BABYLON.Mesh.CreateBox("skyBox", 10000.0, this.scene);
        this.skyBoxMaterial = new BABYLON.StandardMaterial("skyBox", this.scene);

        this.skyBoxMaterial.backFaceCulling = false;
        this.skyBoxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/TropicalSunnyDay", this.scene);
        this.skyBoxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        this.skyBoxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        this.skyBoxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        this.skyBoxMaterial.disableLighting = true;
        this.skyBoxMesh.material = this.skyBoxMaterial;
    }

}
