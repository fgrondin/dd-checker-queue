module.exports = Exchanger;
function Exchanger() {
};

Exchanger.prototype.getAmqpUri = function getAmqpUri(config) {
    return 'amqp://' + config.user + ':' + config.password + '@' + config.host + ':' + config.port;
};

Exchanger.prototype.stringify = function stringify(obj) {
    return (typeof obj !== 'string'? JSON.stringify(obj) : obj);
};