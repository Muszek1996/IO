class Player {
    id;
    posX;
    posY;
    health;

    constructor(scene) {
        this.health = 0.2;
        this.loadObjectOnScene(scene)
    }

    loadObjectOnScene(scene){
        var h = this.health;

        BABYLON.SceneLoader.ImportMesh("", "scenes/", "pirate_ship_wo_masts_no_base.stl", scene, function (newMeshes) {
            var statek = newMeshes[0];
            var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

            var gui = new BABYLON.GUI.Rectangle();
            gui.width = h;
            gui.height = "40px";
            gui.color = "Orange";
            gui.background = "green";
            advancedTexture.addControl(gui);
            var napis = new BABYLON.GUI.TextBlock();
            napis.text = "statek 1";
            gui.addControl(napis);
            gui.linkWithMesh(statek);
            gui.linkOffsetY = -200;
        });
    }

    rotateLeft(){
        console.log("LEFT");
    }
    rotateRight(){
        console.log("RIGHT");
    }
}
