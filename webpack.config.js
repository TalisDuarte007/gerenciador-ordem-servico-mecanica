const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
      },
      module: {
        rules: [
          {
            test: /\.js$/, // Todos os arquivos que terminam com .js
            exclude: /node_modules/, // Exceto os que estão na pasta node_modules
            use: 'babel-loader' // Use o carregador babel-loader
          }
        ]
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: './src/index.html' // O arquivo HTML que será usado como modelo
        })
      ],
      resolve: {
        fallback: {
            "https": require.resolve("https-browserify"),
            "querystring": require.resolve("querystring-es3"),
            "http": require.resolve("stream-http")
          } 
        }
    
  };
  