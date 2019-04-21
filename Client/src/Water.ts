import {SCENE} from "./Babylon/SCENE";

export class Water {
    waterMesh: BABYLON.Mesh;
    waterMaterial: BABYLON.WaterMaterial;
    scene: BABYLON.Scene;

    constructor() {
        this.scene = SCENE.getInstance();

        this.waterMesh = BABYLON.Mesh.CreateGround("oceanMesh", 20480, 20480, 2, this.scene, false);
        this.waterMaterial = new BABYLON.WaterMaterial("waterMaterial", this.scene);
        this.waterMaterial.bumpTexture = new BABYLON.Texture("textures/waterbump.png", this.scene);

        //WATER PROPERTIES
        this.waterMaterial.windForce = -10;
        this.waterMaterial.waveHeight = 0.8;
        this.waterMaterial.windDirection = new BABYLON.Vector2(-1, 0.1);
        this.waterMaterial.waterColor = new BABYLON.Color3(0.1, 0.1, 0.6);
        this.waterMaterial.colorBlendFactor = 0.2;
        this.waterMaterial.bumpHeight = 1;
        this.waterMaterial.waveLength = 0.1;
        this.waterMaterial.waveSpeed = 200;

        this.waterMesh.material = this.waterMaterial;
    }

    public addToRenderList(mesh : BABYLON.Mesh) : void{
        this.waterMaterial.addToRenderList(mesh);
    }

}
