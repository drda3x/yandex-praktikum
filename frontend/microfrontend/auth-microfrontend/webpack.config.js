const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack").container
  .ModuleFederationPlugin;
const path = require("path");

module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    port: 3001,
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
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
	  {
      	  test: /\.s[ac]ss$/i,
      	  use: [
      	    // Creates `style` nodes from JS strings
      	    'style-loader',
      	    // Translates CSS into CommonJS
      	    'css-loader',
      	    // Compiles Sass to CSS
      	    'sass-loader',
      	  ],
      }
    ],
  },
  plugins: [
	new ModuleFederationPlugin({
		name: "auth",
        filename: "remoteEntry.js",
		exposes: {
            "./Login": "./src/components/Login",
            "./Register": "./src/components/Register"
		},
		shared: ["react", "react-dom"]
	}),
	new HtmlWebpackPlugin({
		template: "./public/index.html",
	}),
  ],
};
