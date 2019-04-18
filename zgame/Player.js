"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Player = /** @class */ (function () {
    function Player(message) {
        this.greeting = message;
    }
    Player.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    return Player;
}());
exports.Player = Player;
