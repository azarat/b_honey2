const webpack = require('webpack');
const path = require("path");
const miniCss = require('mini-css-extract-plugin');

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, 'dist1'),
    filename: "./main.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "dist1"),
    compress: true,
    port: 9000,
    watchContentBase: true,
    progress: true
  },

  // Need in case of spliting files, e.g. CSS

  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       style_1: {
  //         name: 'style_1',
  //         test: /style_1\.scss$/,
  //         chunks: 'all',
  //         enforce: true
  //       }
  //     }
  //   }
  // },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader', 'astroturf/loader']
      },

      // Not sure if I would use SCSS, i.e. PostCSS is preferable

      // {
      //   test: /\.scss$/,
      //   use: [
      //     'style-loader',
      //     miniCss.loader,
      //     {
      //       loader: 'css-loader',
      //       options: { sourceMap: true }
      //     }, {
      //       loader: 'postcss-loader',
      //       options: { sourceMap: true, config: { path: 'postcss.config.js' } }
      //     }
      //   ]
      // },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          miniCss.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          }, {
            loader: 'postcss-loader',
            options: { sourceMap: true, config: { path: 'postcss.config.js' } }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      }
    ]
  },
  plugins: [
    new miniCss({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ]
};
