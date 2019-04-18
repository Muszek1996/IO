import {Player} from "./Player"

class Ship {
    greeting: string;
    players: Player;
    pos : any;


    constructor(message: string) {
        this.greeting = message;
        this.pos = { "x": 1, y:"1" ,"z": 1};

    }
    greet() {
        return "Hello, " + this.greeting;
    }
}
