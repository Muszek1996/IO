const {ShipSocket} = require('../GameLogic/SocketMiddlewares/ShipSocket');
const socket = require('socket.io');

const socketConfig = (http)=>{
    const io = socket(http);

    new ShipSocket().attachShipsMidleware(io);

    return io;
}

module.exports = socketConfig;


