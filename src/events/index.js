module.exports = {
  register: function (io) {
    io.on('connection', function (socket) {
      require('./start')(socket);
      require('./stop')(socket);
    });
  }
};
