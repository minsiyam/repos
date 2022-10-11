const path = require("path");

module.exports = {
    context: path.resolve(__dirname, "./"),
    entry: {
        demo: [ "babel-polyfill", "whatwg-fetch", "./src/demo.js" ],
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "[name].bundle.js",
    },
    //scripts: {   build: "webpack --config webpack.config.js" },
    module: {
        rules: [ {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            query: { presets: [ "@babel/preset-env" ] },
        } ],
    },
    mode: 'development',
};

