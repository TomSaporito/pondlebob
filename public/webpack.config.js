var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin"); //to extract css from js load and make into its own stylesheet
require('dotenv').config({
  path: '../.env'//path to the .env file
});

module.exports = {
  context: __dirname + '/', // `__dirname` is root of project and `src` is source

  entry: {
    main: './render.js',

  },

  output: {
    path: __dirname + '/dist', // `dist` is the destination,
    publicPath: '/',
    filename: '[name].bundle.min.js?v=[hash]'
  },

  //To run development server
  devServer: {
    contentBase: __dirname + '/public',
    publicPath: '/',
    inline: true,
    hot: true

  },
  //remove watch limit
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: /node_modules/
    },
  node: {
    fs: 'empty'
  },

  watch: true,

  module: {
    rules: [
      {
        test: /\.js[x]?$/, // Check for all js and jsx files
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015', 'stage-0', 'react'] }
        }]
      },
      {                                                       //compiles scss, load css into js
        test: /\.(scss|css)$/,
        use: ExtractTextPlugin.extract({
            use: [{
              loader: "css-loader",
              options: {
                  minimize: true,
                  sourceMap: true
                }
              },
              {
                  loader: 'postcss-loader'
              },
              {
                  loader: "sass-loader"
              }],
                // use style-loader in development
            fallback: "style-loader"
        })
        }
        ,{
            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,    //convert imgs, etc. to dataUrls
            loader: 'url-loader',
            options: {
                limit: 10000
            }
        }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],   //tells webpack to find these extensions when importing, allows us to exclude file extension in "import" statements
    modules: [path.resolve(__dirname, '/'), 'node_modules/'],
    descriptionFiles: ['package.json']
  },



  plugins: [
      new webpack.optimize.UglifyJsPlugin({                   //plugin that minifies js
          compress: { warnings: false },                      //compression settings
          sourceMap: true                                     //generate a source map for each minified file
      })
    //,new webpack.optimize.CommonsChunkPlugin({
        //    name: 'runtime'
    //})
    ,new ExtractTextPlugin("[name]-styles.css?v=[hash]")    //plugin that extracts css.  Takes one argument of an output name (which references keys in [entry] object)... to minify css use optimize-css-assets-webpack-plugin
    ,new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }
      })
  ],



  devtool: "source-map" // Default development sourcemap
};