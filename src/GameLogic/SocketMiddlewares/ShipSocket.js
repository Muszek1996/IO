"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Ship_1 = require("../Entities/Ship");
var ShipSocket = /** @class */ (function () {
    function ShipSocket() {
        this.Ships = {};
    }
    ShipSocket.prototype.attachShipsMidleware = function (io) {
        var self = this;
        io.on('connection', function (socket) {
            var playerShip = new Ship_1.Ship(0, 100 * Object.keys(self.Ships).length, 150, socket.id.toString()); //TODO ship creator /factiory;
            socket.emit("createMyShip", playerShip); //send own ship to player
            socket.emit("otherExistingShips", self.Ships); //send other players ship to connected player
            socket.broadcast.emit("newlyConnectedShip", playerShip); //send newly connected player to others
            self.Ships[playerShip.name] = (playerShip);
            socket.on('disconnect', function () {
                io.emit("shipDisconnected", playerShip.name);
                delete self.Ships[playerShip.name];
                playerShip = null;
            });
        });
        return io;
    };
    return ShipSocket;
}());
exports.ShipSocket = ShipSocket;
