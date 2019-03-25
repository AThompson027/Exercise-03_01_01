var api = require('./api'),
  _ = require('lodash');

function getPopularSlices (callback) {
  _getFinalQuotes(function (err, finalQuotes) {
    var orderedQuotes = _.orderBy(finalQuotes, ['quote'], ['desc']);

    if (callback) {
      callback(null, _.take(orderedQuotes, 4));
    }
  });
}

function getMostPopular (callback) {
  _getFinalQuotes(function (err, finalQuotes) {
    var mostPopular = finalQuotes.reduce(function (best, curr) {
      if (curr.quote > best.quote) {
        return curr;
      }
      return best;
    }, { quote: 0 });

    if (callback) {
      callback(null, mostPopular);
    }
  });
}

function getNewestSlice (callback) {
  api.getPizza('HAWA', function (err, pizza) {
    if (callback) {
      callback(null, { ticker: 'HAWA', quote: pizza.getLast() });
    }
  });
}

function getMostImproved (callback) {
  api.getAllQuotes(function (err, allQuotes) {
    var diffQuotes = [],
      mostImproved;
    for (var key in allQuotes) {
      diffQuotes.push({
        ticker: key,
        diff: allQuotes[key][allQuotes[key].length - 1] - allQuotes[key][0],
        quote: allQuotes[key][allQuotes[key].length - 1]
      });
    }

    mostImproved = diffQuotes.reduce(function (best, curr) {
      if (curr.diff > best.diff) {
        return curr;
      }
      return best;
    }, { diff: 0});

    if (callback) {
      callback(null, mostImproved);
    }
  });
}

function _getFinalQuotes (callback) {
  var finalQuotes = [];
  api.getAllQuotes(function (err, allQuotes) {
    for (var key in allQuotes) {
      finalQuotes.push({
        ticker: key,
        quote: allQuotes[key][allQuotes[key].length - 1],
        diffLast: _percentOf(allQuotes[key][allQuotes[key].length - 2], allQuotes[key][allQuotes[key].length - 1])
      });
    }

    if (callback) {
      callback(null, finalQuotes);
    }
  });
}

function _percentOf (val1, val2) {
  return (val2 - val1) / val1;
}

module.exports = {
  getPopularSlices: getPopularSlices,
  getMostPopular: getMostPopular,
  getNewestSlice: getNewestSlice,
  getMostImproved: getMostImproved
};
