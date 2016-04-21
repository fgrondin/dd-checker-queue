var ApproveConsumer                     = require('../amqp/ApproveConsumer');
var DelayExchange                       = require('../amqp/DelayExchange');
var CheckConsumer                       = require('../amqp/CheckConsumer');
var loggable                            = require('../Loggable');

module.exports = AmqpConsumers;
function AmqpConsumers(options) {
    this.options = options;
}

AmqpConsumers.prototype.start = function start(callbackApproveExchange, callbackCheckExchange) {
    var logger = this.options.config.logger;
    loggable.log(logger, function () { logger.info('AmqpConsumers.start() ...'); });
    new ApproveConsumer(this.options).init(function (message) {
        callbackApproveExchange(JSON.parse(message.content.toString()));
    });
    new CheckConsumer(this.options).init(function (message) {
        callbackCheckExchange(JSON.parse(message.content.toString()));
    });
    new DelayExchange(this.options).init();
};