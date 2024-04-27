// https://betterprogramming.pub/creating-chrome-extensions-with-typescript-914873467b65

// https://webpack.js.org/plugins/copy-webpack-plugin/
const CopyPlugin = require("copy-webpack-plugin");

//
const path = require('path');

module.exports = {
    // mode: "production", // https://webpack.js.org/configuration/mode/ // TODO: change to 'production' in production
    mode: "development", // https://webpack.js.org/configuration/mode/
    // https://webpack.js.org/configuration/devtool/
    // (none) - Recommended choice for production builds with maximum performance
    devtool: 'source-map',
    // devtool: 'cheap-module-source-map',
    // devtool: 'eval-source-map', // Recommended choice for development builds with high quality SourceMaps << Error
    entry: {
        background: path.resolve(__dirname, "..", "src", "background/background.ts"),
        sidePanelRoot: path.resolve(__dirname, "..", "src", "sidePanel/sidePanelRoot.tsx"),
        optionsRoot: path.resolve(__dirname, "..", "src", "optionsPage/optionsRoot.tsx"),
        content: path.resolve(__dirname, "..", "src", "content/content.ts"),
    },
    output: {
        // Clean the output directory before emit
        // https://webpack.js.org/configuration/output/#outputclean
        clean: true,
        path: path.resolve(__dirname, '../dist'),
        // filename: 'bundle.js',
        filename: "[name].js",
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        // extensions: [".ts", ".js"],
    },
    module: {
        rules: [
            {
                // Include all modules that pass test assertion
                // https://webpack.js.org/configuration/module/#ruletest
                // we set a regular expression in test of what file endings to run the ts-loader on
                test: /\.tsx?$/,
                use: {
                    loader: 'ts-loader',
                },
                // in exclude we are telling webpack not to traverse through the node_modules dependencies
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                // { from: "source", to: "dest" },
                // { from: "other", to: "public" },
                {from: "public", to: "../dist"},
            ],
        }),
    ],
};
