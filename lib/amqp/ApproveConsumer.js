var amqp                                = require('amqplib/callback_api');
var Util                                = require('util');
var Exchanger                           = require('./Exchanger');
var constants                           = require('./Constants');
var loggable                            = require('../Loggable');

module.exports = ApproveConsumer;
Util.inherits(ApproveConsumer, Exchanger);
function ApproveConsumer(options) {
    this.config = options.config;
    this.logger = this.config.logger;
};

ApproveConsumer.prototype.init = function init(callback) {
    var self = this;
    amqp.connect(this.getAmqpUri(this.config), function (err, conn) {
        conn.createChannel(function (err, ch) {
            ch.assertExchange(constants.APPROVE_EXCHANGE, 'direct', {durable: false});
            ch.assertQueue('', {exclusive: true}, function (err, q) {
                loggable.log(self.logger, function () { self.logger.debug(" [*] ApproveConsumer waiting for messages in %s.", q.queue); } );
                ch.bindQueue(q.queue, constants.APPROVE_EXCHANGE, '');
                ch.consume(q.queue, function (msg) {
                    callback(msg);
                }, {noAck: true});
            });
        });
    });
};