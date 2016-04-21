var Classes = Object.create(null);


/**
 * Starts consumers.
 * @param {object} config
 * @public
 */
exports.startConsumers = function startConsumers(options, callbackApproveExchange, callbackCheckExchange) {
    var AmqpConsumers      = loadClass('AmqpConsumers');
    var QueueConfig        = loadClass('QueueConfig');
    new AmqpConsumers({config: new QueueConfig(options)}).start(callbackApproveExchange, callbackCheckExchange);
};

/**
 * Send Message to Approve Exchange.
 * @param {object} config
 * @public
 */
exports.sendToApproveExchange = function sendToApproveExchange(options, message) {
    var ApproveProducer         = loadClass('ApproveProducer');
    new ApproveProducer({config: new ConnectionConfig(options)}).send(message);
};

/**
 * Load the given class.
 * @private
 */
function loadClass(className) {
    var Class = Classes[className];

    if (Class !== undefined) {
        return Class;
    }

    // This uses a switch for static require analysis
    switch (className) {
        case 'AmqpConsumers':
            Class = require('./lib/service/AmqpConsumers');
            break;
        case 'ApproveProducer':
            Class = require('./lib/amqp/ApproveProducer');
            break;
        case 'QueueConfig':
            Class = require('./lib/service/QueueConfig');
            break;
        default:
            throw new Error('Cannot find class \'' + className + '\'');
    }

    // Store to prevent invoking require()
    Classes[className] = Class;

    return Class;
}
