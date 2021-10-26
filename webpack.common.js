const path = require("path");
const hbsrender = require("./src/persy.pages");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackInjector = require('html-webpack-injector');
const Dotenv = require('dotenv-webpack');
const ImageminWebpWebpackPlugin = require("imagemin-webp-webpack-plugin");

//Webpack Plugins
let plugins = [
  new MiniCssExtractPlugin({
    filename: "./css/[name].css"
  }),
  new CopyPlugin({
    patterns: [{
        from: './src/assets/img',
        to: './img'
      },
      {
        from: './src/assets/fonts',
        to: './fonts'
      },
      {
        from: './src/assets/config',
        to: './'
      }
    ]
  }),
  new HtmlWebpackInjector(),
  new Dotenv({
    systemvars: true,
    silent: true,
  }),
  new ImageminWebpWebpackPlugin({
    config: [{
      test: /\.(jpe?g|png)/,
      options: {
        quality: 75,
        alphaQuality: 100
      }
    }],
    overrideExtension: true,
    detailedLogs: false,
    silent: false,
    strict: true
  })
]

// Create HTML form pages.config.js
for (let i = 0; i < hbsrender.pages.length; i++) {
  plugins.unshift(
    new HtmlWebpackPlugin({
      template: hbsrender.pages[i].template,
      title: hbsrender.pages[i].title,
      filename: hbsrender.pages[i].filename,
      color: hbsrender.pages[i].color,
      fav: hbsrender.pages[i].fav,
      desc: hbsrender.pages[i].desc,
      lang: hbsrender.pages[i].lang,
      ogtype: hbsrender.pages[i].ogtype,
      ogurl: hbsrender.pages[i].ogurl,
      ogimage: hbsrender.pages[i].ogimage,
      ogbiz: hbsrender.pages[i].ogbiz,
      inject: false,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    })
  );
}

module.exports = {
  entry: {
    styles: ["./src/scss/main.scss"],
    main: ["./src/main.js"]
  },
  output: {
    filename: "./js/[name].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: '/'
  },
  plugins: plugins,
  module: {
    rules: [{
        test: /\.hbs$/,
        loader: "handlebars-loader",
        options: {
          helperDirs: [
            path.join(__dirname, 'src', 'helpers')
          ],
          partialDirs: [
            path.join(__dirname, 'src', 'views', 'layouts'),
            path.join(__dirname, 'src', 'views', 'components'),
            path.join(__dirname, 'src', 'views', 'pages')
          ]
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
              sourceMap: false
            }
          },
          {
            loader: "sass-resources-loader",
            options: {
              resources: ["src/scss/libs/_persy.scss", "src/scss/libs/_grid.scss", "src/scss/libs/_fonts.scss", "src/scss/common.scss", "src/scss/pages/*.scss"]
            }
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        include: [
          path.resolve(__dirname, "src/assets/fonts")
        ],
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts'
          }
        }]
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        include: [
          path.resolve(__dirname, "src/assets/img")
        ],
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: 'img'
          }
        }
      }
    ]
  }
};