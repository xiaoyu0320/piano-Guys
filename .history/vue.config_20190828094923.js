const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
const isProduction = process.env.NODE_ENV === 'production';
// const UglifyPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
  publicPath: './', // base url
  outputDir: 'dist', // build outputDir
  lintOnSave: true, // eslint-loader 是否在保存的时候检查
  // webpack相关配置
  // 链式操作
  chainWebpack: config => {
    config.plugins.delete('prefetch')
     
  },

  // 基础配置
  configureWebpack: config => {
    if (isProduction) {
      config.plugins.push(new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      }))
    }
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.mode = 'production'
      // config.module
      //    .rule('images')
      //      .use('url-loader')
      //       .loader('url-loader')
      //         .tap(options => Object.assign(options,{limit:20000}))
      // 将每个包打成单独的js文件
      let optimization = {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: 5,
          minSize: 20000,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name (module) {
                // get the name. E.g. node_modules/packageName/not/this/part.js
                // or node_modules/packageName
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                // npm package names are URL-safe, but some servers don't like @ symbols
                return `npm.${packageName.replace('@', '')}`
              }
            }
          }

        },
        // minimizer: [new UglifyPlugin({
        //   uglifyOptions: {
        //     compress: {
        //       warnings: false,
        //       drop_console: true,
        //       drop_debugger: false,
        //       pure_funcs: ['console.log'] // 移除console
        //     }
        //   }
        // })]
      }
      Object.assign(config, {
        optimization
      })
    } else {
      // 为开发环境修改配置...
      config.mode = 'development'
    }
    Object.assign(config, {
      // 开发共同配置
      resolve: {
        extensions: ['.js', '.json', '.css', '.vue'],
        // 别名配置
        alias: {
          '@': path.join(__dirname, 'src'),
          '@c': path.join(__dirname, 'src/components'),
          '@v': path.join(__dirname, 'src/views'),
          '@img': path.join(__dirname, 'public/images')
          'api': path.join(__dirname, 'src/api/wallet')
        }
      }
    })
  },
  // 是否在生产环境恒产sourceMap
  productionSourceMap: false,
  // css相关配置
  css: {
    sourceMap: false, // 开启 CSS source maps?
    loaderOptions: {
      sass: {
        data: `@import "~@/styles/reset.scss";`
      }
    }, // css预设器配置项
    modules: false // 启用 CSS modules for all css / pre-processor files.
  },
  parallel: require('os').cpus().length > 1, // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  devServer: {
    open: process.platform === 'darwin',
    hot: true, // 热加载
    host: '0.0.0.0', // 允许外部ip访问
    port: 8080, // 端口
    https: false, // 是否启动https
    // 报错在页面弹出
    overlay: {
      errors: true
    }
  },
  // 第三方插件配置
  pluginOptions: {
  },
 
}
