var quoteManager = require('./quoteManager');

var runInterval;

module.exports = {
  run (socket) {
    runInterval = setInterval(function () {
      quoteManager.updateQuotes(function (err, newData) {
        socket.emit('new_data', JSON.stringify(newData));
      });
    }, 1000);
  },

  stop () {
    clearInterval(runInterval);
  }
};
