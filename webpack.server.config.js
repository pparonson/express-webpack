const path = require("path")

const nodeExternals = require("webpack-node-externals")

module.exports = (env, argv) => {
  // using Webpack 4 feature that allows the config file to export a function
  // which takes argv as a param. argv has a property mode which tells you what
  // mode flag the webpack command was called with (development or production)
  // from the CLI
  const SERVER_PATH = (argv.mode === "production") ?
    "./src/server/server-prod.js" : "./src/server/server-dev.js"
  return (
    {
      entry: {
        server: SERVER_PATH
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
            // Transpiles ES6-8 into ES5
            test: /\.js$/
            // Dependencies do not require transpilation
            , exclude: /node_modules/
            , use: {
              loader: "babel-loader"
            }
          }
        ]
      }
    } // end: obj
  ) // end: return
}
