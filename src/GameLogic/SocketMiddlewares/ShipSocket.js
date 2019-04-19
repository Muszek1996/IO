const {Ship} = require('../Entities/Ship');

let Ships = {};

const shipSocketConfig = (io)=>{

    io.on('connection', function(socket){
        let playersShip = new Ship(0,100*Object.keys(Ships).length,0,socket.id.toString());



        io.emit("sendOwnShip",playersShip);
        socket.emit("updateShips",Ships);

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

