//Konfiguracja Webpack
module.exports = {
  entry: [
    './js/bomb.js',
    './js/movement.js',
    './js/ghost-collision.js',
    './js/app.js',
  ],
  output: {filename: 'js/out.js'},
  watch: true,
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
    ]
  }
}
