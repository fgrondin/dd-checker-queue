var amqp                                = require('amqplib/callback_api');
var Util                                = require('util');
var Exchanger                           = require('./Exchanger');
var constants                           = require('./Constants');
var loggable                            = require('../Loggable');

module.exports = ApproveProducer;
Util.inherits(ApproveProducer, Exchanger);
function ApproveProducer(options) {
    this.config = options.config;
    this.logger = this.config.logger;
};

ApproveProducer.prototype.send = function send(message) {
    var self = this;
    var message = this.stringify(message);
    amqp.connect(this.getAmqpUri(this.config), function (err, conn) {
        conn.createChannel(function (err, ch) {
            ch.assertExchange(constants.APPROVE_EXCHANGE, 'direct', {durable: false});
            ch.publish(constants.APPROVE_EXCHANGE, '', new Buffer(message));
            loggable.log(self.logger, function () { self.logger.debug(" [x] ApproveProducer sent %s", message); } );
        });
        setTimeout(function () {
            conn.close();
        }, 1000);
    });
};