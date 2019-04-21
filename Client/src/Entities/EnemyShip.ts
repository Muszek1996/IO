import {EntityCreator} from './Utils/EntityCreator.js'

export class EnemyShip {
    pos : BABYLON.Vector3;
    mesh : BABYLON.Mesh;

    constructor(pos, meshFile, name){
        this.pos = pos;
        new EntityCreator(pos, meshFile, name);

    }


}


