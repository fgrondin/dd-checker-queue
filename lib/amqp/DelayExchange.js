var amqp                                = require('amqplib/callback_api');
var Util                                = require('util');
var Exchanger                           = require('./Exchanger');
var constants                           = require('./Constants');
var loggable                            = require('../Loggable');

module.exports = DelayExchange;
Util.inherits(DelayExchange, Exchanger);
function DelayExchange(options) {
    this.config = options.config;
    this.logger = this.config.logger;
};

DelayExchange.prototype.init = function init() {
    var self = this;
    amqp.connect(this.getAmqpUri(this.config), function (err, conn) {
        conn.createChannel(function (err, ch) {
            ch.assertExchange(constants.DELAY_EXCHANGE, 'direct', {durable: false});
            ch.assertQueue('', {
                exclusive: true,
                arguments: {
                    'x-dead-letter-exchange': constants.WORK_EXCHANGE,
                    'x-message-ttl': self.config.delayExchange.ttl
                }
            }, function (err, q) {
                loggable.log(self.logger, function () { self.logger.debug(" [*] DelayExchange waiting for messages in %s.", q.queue); });
                ch.bindQueue(q.queue, constants.DELAY_EXCHANGE, '');
            });
        });
    });
};
