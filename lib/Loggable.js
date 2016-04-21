module.exports = Loggable;
function Loggable() {
}

Loggable.log = function log(logger, callback) {
  if(typeof logger !== 'undefined') {
     callback();
  }
};


