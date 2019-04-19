import {EntityCreator} from './EntityCreator.js'

class Ship {

    constructor(pos, scene, meshFile, name){
        new EntityCreator(pos, scene, meshFile, name);
    }


}

export {Ship};
