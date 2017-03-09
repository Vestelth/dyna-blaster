//Konfiguracja Webpack
module.exports = {
  entry: [
    'whatwg-fetch',
    './js/zadanie01.jsx',
  ],
  output: {filename: 'js/out.js'},
  devServer: {
    inline: true,
    contentBase: './',
    port: 3001
  },
  watch: true,
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-2']
        }
      },
    ]
  }
}
