import {EntityCreator} from './EntityCreator.js'

class Ship {


    constructor(pos, scene, meshFile, name){
        this.scene = scene;
        this.pos = pos;

        new EntityCreator(pos, scene, meshFile, name);

    }


}

export {Ship};
