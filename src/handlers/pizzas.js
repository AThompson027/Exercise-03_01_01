var dataStore = require('../lib/dataStore');

module.exports = function (request, reply) {
  dataStore.getPizzas(function (err, data) {
    if (err) {
      console.error(err);
      reply(err);
    } else {
      reply(data);
    }
  });
};
