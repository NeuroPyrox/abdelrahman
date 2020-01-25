module.exports = {
  mode: "development",
  context: `${__dirname}/`,
  entry: { main: "./main/main.jsx", admin: "./admin/admin.jsx" },
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
      }
    ]
  }
};
