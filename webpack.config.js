module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname + '/public',
    publicPath: '/',
    filename: 'js/bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query:
        {
          presets:['react']
        }
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