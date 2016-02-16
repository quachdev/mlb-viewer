module.exports = {
  entry: {
    javascript: './src/app.js'
  },
  output: {
    path: __dirname + '/public',
    publicPath: '/',
    filename: 'js/app.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};