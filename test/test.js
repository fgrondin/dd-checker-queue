var index  = require('../index.js');
var logger = require('./Logger');


function start() {
    index.startConsumers({host: 'localhost', port: 5672, user: 'guest', password: 'guest', delayExchange: {ttl: 15000}, logger: logger},
    function(message){console.log(message)},
    function(message){console.log(message)});
}

start();


