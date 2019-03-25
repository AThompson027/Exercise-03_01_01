var window = require('window'),
  dataStore = require('./dataStore'),
  lineChart = require('./line-chart'),
  moneyFormat = require('../helpers/moneyFormat'),
  $ = require('jquery');

require('./market').init();
require('./line-chart').drawMain();

window.show = function (ticker) {
  var pizza,
    $spotlight = $('#spotlight'),
    $summaries = $('#summaries');

  console.log(ticker);
  if (ticker === 'main') {
    $('#secondSection > .title').text('Recent Updates');
    $spotlight.hide();
    $summaries.show();
  } else {
    pizza = dataStore.getPizza(ticker);
    dataStore.setSpotlight(ticker);
    lineChart.updateSpotlightChart();
    $('#secondSection > .title').text(pizza.name + ' - ' + pizza.ticker);
    $spotlight.find('.title').text(pizza.name);
    $spotlight.find('.image > img').attr('src', '/public/images/' + pizza.ticker.toLowerCase() + '.png');
    $spotlight.find('.quote').text(moneyFormat(pizza.quotes[pizza.quotes.length - 1]));
    $spotlight.show();
    $summaries.hide();
  }
};
