export class Position {
    pos: BABYLON.Vector3;


    constructor(x, z, y=0) {
        this.pos = new BABYLON.Vector3(x,y,z);
    }

}


//TODO typescript
