const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "./",
  //样式与js不分开
  css: {
    extract: false,
  },
});

