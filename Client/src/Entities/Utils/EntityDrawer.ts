import {SCENE} from "../../Babylon/SCENE";
import {OwnShip} from "../Ships/OwnShip";

export class EntityDrawer {

    static create(ship): void {

        BABYLON.SceneLoader.ImportMesh([ship.name], "scenes/", ship.meshFile, SCENE.getInstance(), function (meshes) {
            ship.ownShipMesh = <BABYLON.Mesh>meshes[0];
            meshes[0].position = new BABYLON.Vector3(ship.pos.x, ship.pos.y, ship.pos.z);
        });

    }


}
