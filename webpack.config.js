const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'client/src/app.js'),
  output: {
    path: path.join(__dirname, 'client/public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [{
      use: ['babel-loader'],
      test: /\.jsx?$/,
      exclude: /node_modules/
    },
    {
      test: /\.s?css$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    }, {
      test: /\.(png|jpg|gif|jpeg)$/,
      use: ['file-loader']
    }]
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    publicPath: '/',
  },
  resolve: {
    extensions: ['.jsx', '.js']
  },
  watch: true
};
