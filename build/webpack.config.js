var path = require("path");
const resolve = (...paths) => path.resolve(__dirname, "..", ...paths);


module.exports = function (env) {
    const optProduction = env.target === "production";
    
    // override from webpack's argument if not set
    if (optProduction && process.env.NODE_ENV !== "production") {
      process.env.NODE_ENV = "production";
    }

    return {
        mode: optProduction ? "production" : "development",
        entry: resolve("./src/index.js"),
        target: "node",
        module: {
            rules: [
              {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                  compact: optProduction,
                },
              },
            ],
          },
        output: {
          path: resolve("dist"),
          filename: "service.js",
        },
        devtool: optProduction ? false : 'source-map'
      };
}