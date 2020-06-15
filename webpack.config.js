'use strict';

const path = require(`path`);

const publicDir = path.resolve(__dirname, `public`);
console.log(publicDir);

module.exports = {
  entry: `./src/index.jsx`,
  output: {
    filename: `bundle.js`,
    path: publicDir,
  },
  devServer: {
    contentBase: publicDir,
    open: true,
    inline: true,
    port: 1337,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`,
        },
      }
    ],
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, `src/components/`),
      '@models': path.resolve(__dirname, `src/models/`),
    },
    extensions: [`.js`, `.jsx`],
  },
  devtool: `source-map`,
};
