const socket = require('socket.io');

const socketConfig = (http)=>{
    const io = socket(http);


    io.on('connection', function(socket){
        console.log('an user connected');
    });
    return io;
}

module.exports = socketConfig;


