import {EntityCreator} from './Utils/EntityCreator.js'
import {SCENE} from "../Babylon/SCENE";
import {CAMERA} from "../Babylon/CAMERA";

export class Ship {
    pos : BABYLON.Vector3;
    mesh : BABYLON.Mesh;

    constructor(pos, meshFile, name){
        this.pos = pos;
        new EntityCreator(pos, meshFile, name);
    }

}


