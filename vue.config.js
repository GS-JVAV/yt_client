
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

})

const path = require('path')

function resolve(dir) {

  return path.join(__dirname, dir)

}
const name = "阴天论坛【打倒狗庄是我们的宗旨 爱党 爱国 爱人民】";// 网址标题

const port = 8082 // 接口端口配置

module.exports = {

  // 配置基地址BASE_URL等于publicpath的值

  // NODE_ENV：Node.js 暴露给执行脚本的系统环境变量。通常用于确定在开发环境还是生产环境

  // 部署应用时的根路径(默认'/'),也可用相对路径(存在使用限制)

  // publicPath: utilsConfig.default.apiUrl,

  // publicPath: process.env.NODE_ENV === "production" ? "./" : "./",

  outputDir: 'dist', // 输出文件目录

  assetsDir: 'static', // // 放置静态资源

  lintOnSave: false,// true/false 设置为开发环境下每次保存代码时都启用 eslint验证

  productionSourceMap: false, // 如果你不需要生产环境的 source map，可以将其设置为false以加速生产环境构建

  devServer: {  // 配置开发服务器

    port: port,

    //   overlay: {  // 错误、警告在页面弹出

    //     warnings: false,

    //     errors: true

    //   },

    /* 跨域代理 */

    proxy: {

      // 第一种写法

      '/client': {

        /* 目标代理服务器地址 */

        target: 'http://173.82.153.44:8003',

        /* 允许跨域 */

        changeOrigin: true,

        // pathRewrite: {  // 标识替换

        //   '^/api': '/static/mock'  // 请求数据路径别名,这里是注意将static/mock放入public文件夹

        // }

      }
    }

  }

}