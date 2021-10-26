const common_webpack = require("./webpack.common");
const {
  merge
} = require("webpack-merge");
const {
  CleanWebpackPlugin
} = require("clean-webpack-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");


module.exports = merge(common_webpack, {
  mode: "production",
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        parallel: true,
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: {
                removeAll: true
              },
            },
          ],
        }
      }),
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          output: {
            comments: false
          }
        }
      })
    ]
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
});