import {Ship} from "./Ship";

export class EnemyShip extends Ship {

    constructor(ship){
        super(ship);
    }

    dispose():void{
        this.mesh.dispose();
    }
}


