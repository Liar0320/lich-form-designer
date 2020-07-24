const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}
console.log("打包开始", process.env.NODE_ENV);
module.exports = {
  publicPath: "./",
  configureWebpack: {
    entry: "./examples/main.js",
    resolve: {
      extensions: [".js", ".ts", ".vue", ".css", "scss"],
      alias: {
        lichFormDesigner: path.resolve(__dirname, "./src"),
        examples: path.resolve(__dirname, "./examples")
      }
    },
    module: {
      rules: [
        // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
        { test: /\.tsx?$/, loader: "ts-loader" }
      ]
    }
    // optimization: {
    //   minimize: true
    // }
    // externals: ["element-ui", "vuedraggable"]
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

    let cdn = null;
    if (process.env.NODE_ENV === "production") {
      // #region 启用第三方cdn加速
      var externals = {
        vue: "Vue",
        "element-ui": "ELEMENT",
        "vue-router": "VueRouter",
        vuedraggable: "vuedraggable",
        clipboard: "ClipboardJS"
      };
      // https://webpack.docschina.org/configuration/externals

      config.externals(externals);
      cdn = {
        css: [
          // element-ui css
          "//unpkg.com/element-ui/lib/theme-chalk/index.css"
        ],
        js: [
          // vue
          "//cdn.staticfile.org/vue/2.5.22/vue.min.js",
          // vue-router
          "//cdn.staticfile.org/vue-router/3.0.2/vue-router.min.js",
          // element-ui js
          "//unpkg.com/element-ui/lib/index.js",
          //vuedraggable
          "//cdn.staticfile.org/Sortable/1.10.2/Sortable.min.js",
          "//cdn.staticfile.org/Vue.Draggable/2.23.2/vuedraggable.umd.min.js",
          //clipboard
          "//cdn.staticfile.org/clipboard.js/2.0.6/clipboard.min.js"
        ]
      };

      // console.log(config.plugin("html"));
      // #endregion
    } else {
      cdn = {
        css: [
          // element-ui css
          "./node_modules/element-ui/lib/theme-chalk/index.css"
        ],
        js: []
      };
    }

    config.plugin("html").tap(args => {
      if (cdn) args[0].cdn = cdn;
      return args;
    });
  }
};
