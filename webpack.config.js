const path = require("path")

const nodeExternals = require("webpack-node-externals")
const HtmlWebPackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: {
    server: path.join(__dirname, "server.js")
  }
  , output: {
    // built files are stored in dist
    path: path.join(__dirname, "dist")

    // In our case we serve assets directly from root
    , publicPath: "/"

    // We add hash to filename to avoid caching issues
    , filename: "[name].js"
  }
  , target: "node"
  , node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false,   // if you don't put this is, __dirname
    __filename: false,  // and __filename return blank or /
  }
  // Need this to avoid error when working with Express
  , externals: [nodeExternals()]
  , module: {
    rules: [
      {
        test: /\.js$/
        // Dependencies do not require transpilation
        , exclude: /node_modules/
        , use: {
          // Transpiles ES6-8 into ES5
          loader: "babel-loader"
        }
      }
      , {
        // Loads the javacript into html template provided.
        // Entry point is set below in HtmlWebPackPlugin in Plugins
        test: /\.html$/
        , use: [{loader: "html-loader"}]
      }
    ]
  }
  , plugins: [
    new HtmlWebPackPlugin({
      template: "./index.html"
      , filename: "./index.html"
      // excludeChunks will exclude a file called server which we don’t want to
      // be included into our HTML file, since that is the webserver, and not
      // needed in the app itself
      , excludeChunks: [ "server" ]
    })
  ]
}
