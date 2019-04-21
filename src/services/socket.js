const socket = require('socket.io');

const gameSockets = require('../GameLogic/SocketMiddlewares/ShipSocket');

const socketConfig = (http)=>{
    const io = socket(http);

            //SOMEHOW MOVE  SHIP EVENTS TO OTHER CLASS/FILE

 /*   io.on('connection', function(socket){
        console.log('An user:'+socket.id+' connected');

        socket.on('disconnect', function(){
        console.log('User:'+socket.id+'disconnected')
        });

    });
*/
    gameSockets(io);
    return io;
}

module.exports = socketConfig;


