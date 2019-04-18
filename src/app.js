var express = require('./services/express');

var app = express();
var http = require('http').createServer(app);
var io = require('./services/socket.js')(http);


module.exports = http;

//TODO dupa
