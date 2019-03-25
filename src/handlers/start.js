module.exports = function (request, reply) {
  require('../lib/market').run();
  reply();
};
