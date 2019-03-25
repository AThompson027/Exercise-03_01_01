module.exports = function (socket) {
  socket.on('start', function () {
    require('../lib/market').run(socket);
  });
};
