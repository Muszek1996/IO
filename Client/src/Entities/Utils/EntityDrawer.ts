import {SCENE} from "../../Babylon/SCENE";
import {OwnShip} from "../Ships/OwnShip";

export class EntityDrawer {

    static create(ship): void {

        BABYLON.SceneLoader.ImportMesh([ship.name], "scenes/", ship.meshFile, SCENE.getInstance(), function (meshes) {
            ship.mesh = <BABYLON.Mesh>meshes[0];
            ship.mesh.physicsImpostor = new BABYLON.PhysicsImpostor(ship.mesh, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 80000, restitution: 0.01, friction:0.05 }, SCENE.getInstance());//.setDeltaRotation(this._plus90X);
            console.log("Created ship:");
            console.log(ship);
            meshes[0].position = new BABYLON.Vector3(ship.pos.x, ship.pos.y, ship.pos.z);
        });

    }


}
