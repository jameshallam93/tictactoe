import path from "path";
import webpack from "webpack";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin"

const config: webpack.Configuration = {
    //entry point for compiler
    entry: "./src/index.tsx",
    //various rules for how to compile different modules
    module: {
        rules : [
            {
                //regex testing for .ts/x and .js/x files
                test: /\.(ts|js)x?$/,
                //do not include the node modules
                exclude: /node_modules/,
                use:{
                    loader: "babel-loader",
                    options:{
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript",
                        ]
                    }
                }
            },
            {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
            }
        ]
    },
    plugins : [
        new ForkTsCheckerWebpackPlugin({
            async:false,
            eslint: {
                files: "./src/**/*"
            }
        })
    ],
    //which files to look for in which order during module resolution
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    //where bundle will be placed
    output: {
        path : path.resolve(__dirname, "build"),
        filename: "bundle.js",
    },
    //configures webpack-dev-server
    devServer: {
        contentBase : path.join(__dirname, "build"),
        compress: true,
        port: 3002
    }
}

module.exports = config;