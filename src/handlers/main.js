var popGen = require('../lib/popGen'),
  dataStore = require('../lib/dataStore');

  //this is a callback hell file wit 6 calls
module.exports = function (request, reply) {
  var context = {};

  //these functions calls will each return a promise
  //it feeds into each other until it reaches a result
const promises = [
  popGen.getPopularSlices(),
  popGen.getMostPopular(),
  popGen.getNewestSlice(),
  popGen.getMostImproved(),
  dataStore.getPizzas()
];
//takes the array of promises and returns only one "then" result
Promise.all(promises)
.then((results) => {
 const context = {
   popSlices: results[0],
   mostPopular: results[1],
   newestSlice: results[2],
   mostImproved: results[3],
   pizzas: results[4]
 };
 return reply.view('index', context);
})
//only way to get result is to complete all five calls.. if it stops then it will be an error
.catch((err) => {
  console.error(err);
});

  // popGen.getPopularSlices(function (err, popSlices) {
  //   context.popSlices = popSlices;

  //   popGen.getMostPopular(function (err, mostPopular) {
  //     context.mostPopular = mostPopular;

  //     popGen.getNewestSlice(function (err, newestSlice) {
  //       context.newestSlice = newestSlice;

  //       popGen.getMostImproved(function (err, mostImproved) {
  //         context.mostImproved = mostImproved;

  //         dataStore.getPizzas(function (err, pizzas) {
  //           context.pizzas = pizzas;

  //           return reply.view('index', context);
  //         });
  //       });
  //     });
  //   });
  // });
};
