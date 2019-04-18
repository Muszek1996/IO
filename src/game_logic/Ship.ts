import Position from "./Position"

class Ship {
    name: string;
    pos : Position;

    constructor(x, z, y=0, name="defaultShip") {
        this.pos = new Position(x,z,y);
        this.name = name;
    }

}

export = {Ship};

//TODO SOME SHIP/ENTITY CREATOR AND TROUGH SOCKET SENDER
