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
  return new Promise((resolve, reject) => {
    _getFinalQuotes()
    .then((finalQuotes) => {
      const mostPopular = finalQuotes.reduce(function (best, curr) {
        if (curr.quote > best.quote) {
          return curr;
        }
        return best;
      }, { 
        quote: 0 
      });
        resolve(mostPopular);
    })
    .catch(reject);
    });
}

function getNewestSlice () {
  return new Promise((resolve, reject) => {
    api.getPizza('HAWA')
  .then((pizza) => {
      resolve({ 
        ticker: 'HAWA', 
        quote: pizza.getLast() 
        });
    })
    //this callback goes to the getNewSlice callback
    //this is the same thing as .catch(reject);
    .catch((err) => {
      reject(err);
    });
  });
}

function getMostImproved () {
  return new Promise((resolve, reject) => {
    api.getAllQuotes()
    .then((allQuotes) => {
      const diffQuotes = [],
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

    resolve(mostImproved);
   })
   .catch(reject);
  });
}

function _getFinalQuotes (callback) {
  return new Promise((resolve, reject) => {
    const finalQuotes = [];
    api.getAllQuotes()
    .then((allQuote) => {
      for (const key in allQuotes) {
        finalQuotes.push({
          ticker: key,
          quote: allQuotes[key][allQuotes[key].length - 1],
          diffLast: _percentOf(allQuotes[key][allQuotes[key].length - 2],
          allQuotes[key][allQuotes[key].length - 1])
          });
        }
        resolve(finalQuotes);
      })
      .catch(reject);
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
