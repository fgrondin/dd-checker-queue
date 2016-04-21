'use strict';

var winston             = require('winston');
var path                = require ('path');
var transports          = [];

transports.push(getConsoleTransport());

function getConsoleTransport() {
    return new winston.transports.Console({
        silent: false,
        level:  'debug',
        timestamp: Date.now(),
        'colorize': true
    });
}

function getFileTransport() {
    var pathssss = path.join(__dirname, "logs", "extra1.log");
    console.log(pathssss);
    return new (require('winston-daily-rotate-file'))({
        name: 'file',
        silent: false,
        level:  'debug',
        json : false,
        datePattern: '.yyyy-MM-dd',
        filename: path.join(__dirname, "logs", "extra1.log")
    });
}

module.exports = new winston.Logger({transports: transports});