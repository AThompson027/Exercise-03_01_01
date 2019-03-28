var api = require('./api'),
  _ = require('lodash');


function getPopularSlices() {
  return new Promise((resolve, reject) => {
    _getFinalQuotes() 
    .then((finalQuotes) => {
      const orderedQuotes = 
      //take an array are order it by quotes = _
            _.orderBy(finalQuotes, ['quote'], ['desc']);
        resolve(null, _.take(orderedQuotes, 4));
    })
    .catch(reject);
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
  api.getPizza('HAWA')
  .then((pizza) => {
    if (callback) {
      callback(null, { 
        ticker: 'HAWA', 
        quote: pizza.getLast() 
        });
      }
    })
    //this callback goes to the getNewSlice callback
    .catch((err) => {
      callback();
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
  getPopularSlices,
  getMostPopular,
  getNewestSlice,
  getMostImproved
};
