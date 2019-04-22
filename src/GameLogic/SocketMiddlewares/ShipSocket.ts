import io from 'socket.io-client';
import {Ship} from '../Entities/Ship';



export class ShipSocket{
    Ships: {[id : string]: Ship} = {};
    constructor(){}
    public attachShipsMidleware(io): io{
        let self = this;
        io.on('connection', function(socket){
            let playerShip = new Ship(0,100*Object.keys(self.Ships).length,150,socket.id.toString());//TODO ship creator /factiory;
            socket.emit("createMyShip",playerShip);    //send own ship to player
            socket.emit("otherExistingShips",self.Ships);    //send other players ship to connected player
            socket.broadcast.emit("newlyConnectedShip", playerShip);   //send newly connected player to others

            self.Ships[playerShip.name] = (playerShip);

            socket.on('disconnect', function(){
                io.emit("shipDisconnected", playerShip.name);
                delete self.Ships[playerShip.name];
                playerShip = null;
            });
        });

        return io;
    }
}
