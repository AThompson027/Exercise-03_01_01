var $ = require('jquery'),
  socket = require('./socketBroker'),
  dataStore = require('./dataStore'),
  lineChart = require('./line-chart'),
  summaries = require('./summaries');

function init () {
  var $openButton = $('.open-button');

  $openButton.click(function () {
    if ($openButton.text() === 'Open Market') {
      socket.emit('start');
      $openButton.text('Close Market');
    } else {
      socket.emit('stop');
      $openButton.text('Open Market');
    }
  });

  dataStore.init();

  socket.on('new_data', function (payload) {
    dataStore.updatePizzas(JSON.parse(payload));
    lineChart.updateMainChart();
    lineChart.updateSpotlightChart();
    summaries.update();
  });
}

module.exports.init = init;
