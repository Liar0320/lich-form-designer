const path = require("path");
const nodeExternals = require("webpack-node-externals");
function resolve(dir) {
  return path.join(__dirname, dir);
}

/**当前环境 */
function isEnvironment(env) {
  return process.env.VUE_APP_Environment === env;
}

let vueConfig = null;

if (isEnvironment("example")) {
  vueConfig = require("./vue.config.example");
} else {
  vueConfig = {
    publicPath: "./",
    productionSourceMap: false,
    configureWebpack: {
      entry: "./src/index.js",
      // entry: "./examples/main.js",
      resolve: {
        extensions: [".js", ".ts", ".vue", ".css", "scss"],
        alias: {
          lichFormDesigner: path.resolve(__dirname, "./src"),
          examples: path.resolve(__dirname, "./examples")
        }
      },
      // optimization: {
      //   minimize: false
      // },
      externals: [nodeExternals()]
      // modules: {
      //   rules: [
      //     // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      //     { enforce: "pre", test: /\.tsx?$/, loader: "ts-loader" }
      //   ]
      // },
    },
    chainWebpack(config) {
      // set svg-sprite-loader
      config.module
        .rule("svg")
        .exclude.add(resolve("src/icons"))
        .end();
      config.module
        .rule("icons")
        .test(/\.svg$/)
        .include.add(resolve("src/icons"))
        .end()
        .use("svg-sprite-loader")
        .loader("svg-sprite-loader")
        .options({
          symbolId: "icon-[name]"
        })
        .end();
    }
  };
}

module.exports = vueConfig;
