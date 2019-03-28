var quoteManager = require('./quoteManager');

var runInterval;

module.exports = {
  run (socket) {
    runInterval = setInterval(function () {
      quoteManager.updateQuotes()
      //chains it to another function
      .then((newData) => {
        socket.emit('new_data', JSON.stringify(newData));
      })
      .catch((err) => {
        console.error(err);
      });
    }, 1000);
  },

  stop () {
    clearInterval(runInterval);
  }
};
