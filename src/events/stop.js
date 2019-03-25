module.exports = function (socket) {
  socket.on('stop', function () {
    require('../lib/market').stop();
  });
  socket.on('disconnect', function () {
    require('../lib/market').stop();
  });
};
