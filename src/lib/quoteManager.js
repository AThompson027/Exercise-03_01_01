var api = require('./api');

module.exports = {
  updateQuotes: function (callback) {
    api.getAllPizzas(function (err, pizzas) {
      var newData = [],
        pizza;

      for (var key in pizzas) {
        pizza = pizzas[key];
        newData.push({
          ticker: pizza.ticker,
          nextQuote: pizza.getNext()
        });
      }

      console.log(newData);
      console.log('updating quotes');
      callback(null, newData);
    });
  }
};
