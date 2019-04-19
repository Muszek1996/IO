const {Ship} = require('../Entities/Ship');

let Ships = {};

const shipSocketConfig = (io)=>{

    io.on('connection', function(socket){
        let playersShip = new Ship(0,100*Object.keys(Ships).length,0,socket.id.toString());



        socket.emit("myShip",playersShip);
        socket.emit("otherExistingShips",Ships);
        io.broadcast.emit("newlyConnectedShip", playersShip);


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

