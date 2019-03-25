const webpack = require('webpack');

module.exports = {
  context: __dirname + '/',
  entry: './src/ui/js/index.js',
  output: {
    path: __dirname + '/src/ui/public/js',
    filename: 'application.js'
  },
  externals: [
    {
      'window': 'window'
    }
  ],
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    })
  ]
};
