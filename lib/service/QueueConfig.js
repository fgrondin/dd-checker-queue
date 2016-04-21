module.exports = QueueConfig;
function QueueConfig(options) {
    this.host               = options.host || 'localhost';
    this.port               = options.port || 5672;
    this.user               = options.user || undefined;
    this.password           = options.password || undefined;
    this.delayExchange      = options.delayExchange || {ttl:300000};
    this.logger             = options.logger ||  undefined;
}