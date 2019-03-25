module.exports = {
  method: 'GET',
  path: '/pizza/{ticker}',
  handler: require('../handlers/pizza')
};
