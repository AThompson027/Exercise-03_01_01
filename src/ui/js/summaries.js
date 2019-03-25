var dataStore = require('./dataStore'),
  $ = require('jquery'),
  _ = require('lodash'),
  moneyFormat = require('../helpers/moneyFormat'),
  percentFormat = require('../helpers/percentFormat');

var $mostPopular = $('#mostPopular'),
  $newestSlice = $('#newestSlice'),
  $mostImproved = $('#mostImproved'),
  $popularSlices = $('#popularSlices').find('.results'),
  $spotlight = $('#spotlight'),
  negClass = 'neg-change',
  posClass = 'pos-change',
  negOrPos = '.' + negClass + ',.' + posClass;

function update () {
  _updatePops();
  _updateMostPopular();
  _updateNewestSlice();
  _updateMostImproved();
  _updateSpotlight();
}

function _updatePops () {
  var pizzas = _getPopularSlices();
  $popularSlices.find('li').each(function (ix) {
    $(this).find('.ticker').text(pizzas[ix].ticker);
    $(this).find(negOrPos).text(percentFormat(pizzas[ix].diffLast));
    if (pizzas[ix].diffLast > 0) {
      $(this).find(negOrPos).addClass(posClass).removeClass(negClass);
    } else {
      $(this).find(negOrPos).addClass(negClass).removeClass(posClass);
    }
    $(this).find('.quote').text(moneyFormat(pizzas[ix].quote));
  });
}

function _updateMostPopular () {
  var mostPopular = _getMostPopular();

  $mostPopular.find('.ticker')
    .text(mostPopular.ticker)
    .attr('onclick', 'show(\'' + mostPopular.ticker + '\')');
  $mostPopular.find('.quote').text(moneyFormat(mostPopular.quote));
}

function _updateNewestSlice () {
  var pizza = dataStore.getPizza('HAWA');
  $newestSlice.find('.quote').text(moneyFormat(pizza.quotes[pizza.quotes.length - 1]));
}

function _updateMostImproved () {
  var pizza = _getMostImproved();
  $mostImproved.find('.ticker')
    .text(pizza.ticker)
    .attr('onclick', 'show(\'' + pizza.ticker + '\')');
  $mostImproved.find('.quote').text(moneyFormat(pizza.quote));
}

function _getPopularSlices () {
  var finalQuotes = _getFinalQuotes(),
    orderedQuotes = _.orderBy(finalQuotes, ['quote'], ['desc']);
  return _.take(orderedQuotes, 4);
}

function _getMostPopular () {
  var finalQuotes = _getFinalQuotes();
  return finalQuotes.reduce(function (best, curr) {
    if (curr.quote > best.quote) {
      return curr;
    }
    return best;
  }, { quote: 0 });
}

function _getFinalQuotes () {
  var allQuotes = dataStore.getAllQuotes(),
    finalQuotes = [];
  for (var key in allQuotes) {
    finalQuotes.push({
      ticker: key,
      quote: allQuotes[key][allQuotes[key].length - 1],
      diffLast: _percentOf(allQuotes[key][allQuotes[key].length - 2], allQuotes[key][allQuotes[key].length - 1])
    });
  }
  return finalQuotes;
}

function _getMostImproved () {
  var allQuotes = dataStore.getAllQuotes(),
    diffQuotes = [];
  for (var key in allQuotes) {
    diffQuotes.push({
      ticker: key,
      diff: allQuotes[key][allQuotes[key].length - 1] - allQuotes[key][0],
      quote: allQuotes[key][allQuotes[key].length - 1]
    });
  }
  return diffQuotes.reduce(function (best, curr) {
    if (!curr.quote || curr.diff > best.diff) {
      return curr;
    }
    return best;
  }, { diff: 0});
}

function _updateSpotlight () {
  var spotlightData = dataStore.getSpotlight();

  if (spotlightData) {
    $spotlight.find('.quote').text(moneyFormat(spotlightData.quotes[spotlightData.quotes.length - 1]));
  }
}

function _percentOf (val1, val2) {
  return (val2 - val1) / val1;
}

module.exports.update = update;
