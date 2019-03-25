var dataStore = require('../lib/dataStore');

module.exports = function (request, reply) {
  var ticker = request.params.ticker;

  if (!ticker) {
    return reply('No ticker provided');
  }

  dataStore.getPizza(ticker, function (err, pizza) {
    if (err) {
      console.error(err);
      reply(err);
    } else {
      reply(pizza);
    }
  });
};
