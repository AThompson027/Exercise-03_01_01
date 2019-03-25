var request = require('request'),
  Pizza = require('../models/pizza');

var localPort;

function initPort (port) {
  localPort = port;
}

function getAllQuotes (callback) {
  request('http://localhost:' + localPort + '/quotes', function (error, res, body) {
    if (callback) {
      callback(error, JSON.parse(body));
    }
  });
}

function getPizza (ticker, callback) {
  request('http://localhost:' + localPort + '/pizza/' + ticker, function (error, res, body) {
    if (callback) {
      callback(error, Pizza.hydrate(JSON.parse(body)));
    }
  });
}

function getAllPizzas (callback) {
  request('http://localhost:' + localPort + '/pizzas', function (error, res, body) {
    if (callback) {
      var staticPizzas = JSON.parse(body),
        pizzas = [];

      for (var ix in staticPizzas) {
        pizzas.push(Pizza.hydrate(staticPizzas[ix]));
      }
      callback(error, pizzas);
    }
  });
}

module.exports = {
  initPort: initPort,
  getAllQuotes: getAllQuotes,
  getPizza: getPizza,
  getAllPizzas: getAllPizzas
};
