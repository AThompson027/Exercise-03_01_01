var request = require('request'),
  Pizza = require('../models/pizza');

var localPort;

function initPort (port) {
  localPort = port;
}

function getAllQuotes () {
  return new Promise((resolve, reject) => {
    //This is an async function that is routing
    request('http://localhost:' + localPort + '/quotes', function (error, res, body) {
      if (error) {
        reject(error);
      }
      else {
        resolve(JSON.parse(body));
      }
    });
  });
}

function getPizza (ticker) {
  return new Promise((resolve, reject) => {
    request('http://localhost:' + localPort + '/pizza/' + ticker, function (error, res, body) {
    if (error) {
      reject(error);
    }
    else {
      resolve(Pizza.hydrate(JSON.parse(body)));
    }
      });
  });
}

function getAllPizzas () {
  return new Promise((resolve, reject) => {
    request('http://localhost:' + localPort + '/pizzas', 
    function (error, res, body) {
      if (error) {
        reject(error);
      }
      else {
        const staticPizzas = JSON.parse(body),
        pizzas = [];
        for (let ix in staticPizzas) {
          pizzas.push(Pizza.hydrate(staticPizzas[ix]));
        }
        resolve(pizzas);
      }
    });
  });
}

module.exports = {
  initPort: initPort,
  getAllQuotes: getAllQuotes,
  getPizza: getPizza,
  getAllPizzas: getAllPizzas
};
