import {EntityDrawer} from '../Utils/EntityDrawer.js'
import * as BABYLON from "babylonjs";



export class Ship {
    private pos : BABYLON.Vector3;
    private name : string;
    private meshFile : string;
    public mesh : BABYLON.Mesh;


    constructor(ship){
        this.pos = ship.pos;
        this.name = ship.name;
        this.meshFile = ship.meshFile;
    }

    draw(){
        EntityDrawer.create(this);
    }
}


