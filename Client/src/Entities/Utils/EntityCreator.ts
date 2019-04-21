import {SCENE} from "../../Babylon/SCENE";

export class EntityCreator {
    name : string;
    shipMesh : BABYLON.Mesh;
    pos : BABYLON.Vector3;

    constructor(pos, meshFile, name) {
        this.name = name;
        this.pos = pos;

        let assetsManager = new BABYLON.AssetsManager(SCENE.getInstance());
        let meshTask = assetsManager.addMeshTask("skull task", name, "scenes/", meshFile);

        meshTask.onSuccess = function (task) {
            task.loadedMeshes[0].name = name;
            task.loadedMeshes[0].position = new BABYLON.Vector3(pos.x, pos.y, pos.z);
        };
        meshTask.onError = function (task, message,  exception) {
            console.log(message, exception);
        };

        assetsManager.load();
    }


}
