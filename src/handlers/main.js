var popGen = require('../lib/popGen'),
  dataStore = require('../lib/dataStore');

module.exports = function (request, reply) {
  var context = {};

  popGen.getPopularSlices(function (err, popSlices) {
    context.popSlices = popSlices;

    popGen.getMostPopular(function (err, mostPopular) {
      context.mostPopular = mostPopular;

      popGen.getNewestSlice(function (err, newestSlice) {
        context.newestSlice = newestSlice;

        popGen.getMostImproved(function (err, mostImproved) {
          context.mostImproved = mostImproved;

          dataStore.getPizzas(function (err, pizzas) {
            context.pizzas = pizzas;

            return reply.view('index', context);
          });
        });
      });
    });
  });
};
