var socket = io();

module.exports.emit = function (event, payload) {
  socket.emit(event, payload);
};

module.exports.on = function (event, payload) {
  socket.on(event, payload);
};
