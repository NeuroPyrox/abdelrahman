module.exports = {
  mode: "development",
  context: `${__dirname}/`,
  entry: { main: "./main/entry.jsx", admin: "./admin/entry.jsx" },
  output: {
    path: __dirname,
    filename: "[name]/bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "jsx-loader"
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      }
    ]
  }
};
