const socket = require('socket.io');
const {Ship} = require('../game_logic/Ship.js');

let Ships = {};

const socketConfig = (http)=>{
    const io = socket(http);

            //SOMEHOW MOVE  SHIP EVENTS TO OTHER CLASS/FILE

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

module.exports = socketConfig;


