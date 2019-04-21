//import Position from "../Utils/Position"
import * as BABYLON from 'babylonjs'

class Ship {
    name: string;
    pos : BABYLON.Vector3;
    meshFile : String;

    constructor(x, z, y=0, name="defaultShip") {
        this.pos = new BABYLON.Vector3(x,y,z);
        this.name = name;
        this.meshFile = "pirate_ship_wo_masts_no_base.stl";
    }

}

export = {Ship};

//TODO SOME SHIP/ENTITY CREATOR AND TROUGH SOCKET SENDER
