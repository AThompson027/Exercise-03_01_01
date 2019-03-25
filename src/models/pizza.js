var fluxGen = require('../lib/fluxGen');

function getRand () {
  return +(Math.random() * 100).toFixed(0);
}
//two parameters required
//... means that there are more parameters that are pizza properties
function Pizza (startingDate, quotes, ...pizzaProps) {
  //var self = this;

  this.startingDate = startingDate;
  this.ticker = pizzaProps[0];
  this.name = pizzaProps[1];
  this.startingQuote = pizzaProps[2];
  this.variability = pizzaProps[3] || getRand();
  this.positivity = pizzaProps[4] || getRand();
  this.quotes = quotes || [this.startingQuote];

// private methods
var addQuote = (quote) => {
  this.quotes.push(quote);
}

var getQuote = (quoteIndex) => {
  this.quotes[quoteIndex];
}
}

  this.getNext = function () {
    var newQuote = fluxGen(this.getLast(), 1, this.variability, this.positivity)[0];
    addQuote(newQuote);
    return newQuote;
  };

  this.getLast = function () {
    return getQuote(this.quotes.length - 1);
  };

  this.getDatedQuotes = function () {
    var quotesMap = {},
      curDate = startingDate;

    this.quotes.forEach(function (quote) {
      quotesMap[curDate] = quote;
      curDate.setDate(curDate.getDate() + 1);
    });

    return quotesMap;
  };

Pizza.hydrate = function (pizzaObj) {
  var newPizza = new Pizza(
    pizzaObj.startingDate,
    pizzaObj.quotes,
    pizzaObj.ticker,
    pizzaObj.name,
    pizzaObj.startingQuote,
    pizzaObj.variability,
    pizzaObj.positivity);

  newPizza.quotes = pizzaObj.quotes;
  return newPizza;
};

module.exports = Pizza;
