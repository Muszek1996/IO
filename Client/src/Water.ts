import {SCENE} from "./Babylon/SCENE";

export class Water {
    waterMesh: BABYLON.Mesh;
    waterMaterial: BABYLON.WaterMaterial;
    scene: BABYLON.Scene;

    constructor() {
        this.scene = SCENE.getInstance();

        this.waterMesh = BABYLON.Mesh.CreateGround("oceanMesh", 20480, 20480, 2, this.scene, true);
        this.waterMaterial = new BABYLON.WaterMaterial("waterMaterial", this.scene);
        this.waterMaterial.bumpTexture = new BABYLON.Texture("textures/waterbump.png", this.scene);

        //WATER PROPERTIES
        this.waterMaterial.windForce = -8;
        this.waterMaterial.waveHeight = 0.8;
        this.waterMaterial.windDirection = new BABYLON.Vector2(-1, 0.1);
        this.waterMaterial.waterColor = new BABYLON.Color3(0, 1, 0.2);
        this.waterMaterial.colorBlendFactor = 0.1;
        this.waterMaterial.bumpHeight = 2;
        this.waterMaterial.waveLength = 0.01;
        this.waterMaterial.waveSpeed = 50;

        this.waterMesh.material = this.waterMaterial;
        this.waterMesh.physicsImpostor = new BABYLON.PhysicsImpostor(this.waterMesh, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, this.scene);
    }

    public addToRenderList(mesh : BABYLON.Mesh) : void{
        this.waterMaterial.addToRenderList(mesh);
    }

}
