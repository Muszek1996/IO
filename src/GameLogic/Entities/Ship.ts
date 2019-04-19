//import Position from "../Utils/Position"
import * as BABYLON from 'babylonjs'

class Ship {
    name: string;
    pos : BABYLON.Vector3;

    constructor(x, z, y=0, name="defaultShip") {
        this.pos = new BABYLON.Vector3(x,y,z);
        this.name = name;
    }

}

export = {Ship};

//TODO SOME SHIP/ENTITY CREATOR AND TROUGH SOCKET SENDER
