
export class EntityCreator {
    constructor(pos, scene, meshFile, name) {
        this.name = name;
        this.shipMesh = null;
        this.pos = pos;
        // @ts-ignore
        let assetsManager = new BABYLON.AssetsManager(scene);
        let meshTask = assetsManager.addMeshTask("skull task", name, "scenes/", meshFile);

        meshTask.onSuccess = function (task) {
            task.loadedMeshes[0].name = name;
            // @ts-ignore
            task.loadedMeshes[0].position = new BABYLON.Vector3(pos.x, pos.y, pos.z);
        };
        meshTask.onError = function (task, message, exception) {
            console.log(message, exception);
        };

        assetsManager.load();
    }


}


