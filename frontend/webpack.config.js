const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack").container
  .ModuleFederationPlugin;
const path = require("path");

module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    port: 3000,
  },
  output: {
    publicPath: "auto",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
      },
      { 
      	  test: /\.svg$/i,
      	  issuer: /\.[jt]sx?$/,
      	  use: ['@svgr/webpack'],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      }
    ],
  },
  plugins: [
	new ModuleFederationPlugin({
		name: "main",
		remotes: {
            auth: "auth@http://localhost:3001/remoteEntry.js",
            profile: "profile@http://localhost:3002/remoteEntry.js"
		},
		shared: ["react", "react-dom"]
	}),
	new HtmlWebpackPlugin({
		template: "./public/index.html",
	}),
  ],
};
