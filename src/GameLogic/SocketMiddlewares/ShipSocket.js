const {Ship} = require('../Entities/Ship');   //TODO TS

let Ships = {};

const shipSocketConfig = (io)=>{

    io.on('connection', function(socket){
        let playersShip = new Ship(0,100*Object.keys(Ships).length,0,socket.id.toString());//TODO ship creator /factiory

        console.log('User:'+socket.id+'disconnected');


        socket.emit("createMyShip",playersShip);    //send own ship to player
        socket.emit("otherExistingShips",Ships);    //send other players ship to connected player
        socket.broadcast.emit("newlyConnectedShip", playersShip);   //send newly connected player to others


        Ships[playersShip.name] = (playersShip);

        socket.on('disconnect', function(){
            io.emit("shipDisconnected", playersShip.name);
            delete Ships[playersShip.name];
            playersShip = null;
        });

    });

    return io;
}

module.exports = shipSocketConfig;

