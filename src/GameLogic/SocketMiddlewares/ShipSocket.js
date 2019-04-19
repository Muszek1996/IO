const {Ship} = require('../Entities/Ship');

let Ships = {};

const shipSocketConfig = (io)=>{

    io.on('connection', function(socket){
        let playersShip = new Ship(0,100*Object.keys(Ships).length,0,socket.id.toString());
        Ships[playersShip.name] = (playersShip);

        console.log('an user connected');
        socket.emit("updateShips",Ships);
        socket.broadcast.emit("sendOwnShip",playersShip);
        // socket.broadcast.to(socket.id).emit("sendOwnShip",playersShip);


        socket.on('disconnect', function(){
            io.emit("shipDisconnected", playersShip.name);
            delete Ships[playersShip.name];
            playersShip = null;
        });

    });

    return io;
}

module.exports = shipSocketConfig;

