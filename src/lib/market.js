var quoteManager = require('./quoteManager');

var runInterval;

module.exports = {
  run: function (socket) {
    runInterval = setInterval(function () {
      quoteManager.updateQuotes(function (err, newData) {
        socket.emit('new_data', JSON.stringify(newData));
      });
    }, 1000);
  },

  stop: function () {
    clearInterval(runInterval);
  }
};
