module.exports = {
  mode: "development",
  context: `${__dirname}/`,
  entry: `${__dirname}/main/main.jsx`,
  output: {
    path: `${__dirname}/main`,
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: `${__dirname}/main`,
        exclude: /node_modules/,
        loader: "jsx-loader"
      }
    ]
  }
};
