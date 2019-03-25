var Chart = require('chart.js'),
  dataStore = require('./dataStore'),
  moneyFormat = require('../helpers/moneyFormat');

var main = {
    context: document.getElementById('mainChart')
  },
  spotlight = {
    context: document.getElementById('spotlightChart'),
    pointBorderColor: 'rgba(42, 73, 121, 0.7)',
    pointBackgroundColor: 'rgba(42, 73, 121, 0.4)',
    backgroundColor: 'rgba(42, 73, 121, 0.4)',
    borderColor: 'rgba(42, 73, 121, 0.7)'
  };

function drawMain () {
  draw(main,
    slimArray(dataStore.getAggregateDates()),
    slimArray(dataStore.getAggregate()));
}

function drawSpotlight () {
  var spotlightData = dataStore.getSpotlight();

  if (spotlightData) {
    draw(spotlight,
      slimArray(dataStore.getDates(spotlightData.startingDate)),
      slimArray(spotlightData.quotes));
  }
}

function draw (chartObj, labels, data) {
  chartObj.chart = new Chart(chartObj.context, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Total',
        data: data,
        lineTension: 0,
        fill: true,
        pointBorderColor: chartObj.pointBorderColor || '',
        pointBackgroundColor: chartObj.pointBackgroundColor || '',
        backgroundColor: chartObj.backgroundColor || '',
        borderColor: chartObj.borderColor || ''
      }]
    },
    options: {
      responsive: false,
      animation: false,
      legend: {
        display: false
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            return moneyFormat(tooltipItem.yLabel);
          }
        }
      },
      scales: {
        yAxes: [
          {
            ticks: {
              callback: function (label, index, labels) {
                return moneyFormat(label);
              }
            }
          }
        ]
      }
    }
  });
}

function slimArray (arr) {
  return arr.slice(arr.length > 20 ? arr.length - 21 : 0);
}

function updateChart (chartObj, dates, quotes) {
  chartObj.chart.data.labels = dates;
  chartObj.chart.data.datasets[0].data = quotes;
  chartObj.chart.update();
}

function updateMainChart () {
  updateChart(main,
    slimArray(dataStore.getAggregateDates()),
    slimArray(dataStore.getAggregate()));
}

function updateSpotlightChart () {
  if (!spotlight.chart) {
    drawSpotlight();
  }

  var spotlightData = dataStore.getSpotlight();

  if (spotlightData) {
    updateChart(spotlight,
      slimArray(dataStore.getDates(spotlightData.startingDate)),
      slimArray(spotlightData.quotes));
  }
}

module.exports = {
  drawMain: drawMain,
  drawSpotlight: drawSpotlight,
  updateMainChart: updateMainChart,
  updateSpotlightChart: updateSpotlightChart
};
