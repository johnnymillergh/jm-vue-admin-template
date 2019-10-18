'use strict'
const path = require('path')
const proxyConfiguration = require('./proxy.config.js')
// Dev port
const port = 8081
process.env.VUE_APP_PACKAGE_JSON = escape(JSON.stringify(require('./package.json')))

function getAppName () {
  const applicationName = JSON.parse(unescape(process.env.VUE_APP_PACKAGE_JSON)).name.replace(/-/g, ' ').toLocaleUpperCase()
  if (process.env.VUE_APP_ENV !== 'prod') {
    return applicationName.concat(' (', process.env.VUE_APP_ENV, ')')
  }
  return applicationName
}

function resolve (dir) {
  return path.join(__dirname, dir)
}

/**
 * Generate public path by environment.
 * @return {string} public path
 */
function generatePublicPath () {
  // FIXME: ATTENTION: Relative path prefix should start with a dot './'
  //  DON'T add the dot when the environment is development, or browser will throw en error like this:
  //  Uncaught SyntaxError: Unexpected token <
  const runOnDocker = process.env.VUE_APP_RUN_ON_DOCKER
  console.error(`This application is running on Docker: ${runOnDocker}, type of runOnDocker: ${typeof runOnDocker}`)
  const pathPrefix = runOnDocker === 'true' ? './' : '/'
  const env = process.env.NODE_ENV
  if (env === 'production') {
    console.error(`pathPrefix: ${pathPrefix}`)
    return pathPrefix
  }
  const applicationName = JSON.parse(unescape(process.env.VUE_APP_PACKAGE_JSON)).name
  if (applicationName) {
    return applicationName ? pathPrefix.concat(applicationName, '-', env, '/') : pathPrefix
  }
  console.error(`pathPrefix: ${pathPrefix}`)
  return pathPrefix
}

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * ATTENTION: You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * <a href="https://cli.vuejs.org/config/#publicpath">Click me to view detail</a>
   *
   * ATTENTION: If static server is Nginx, the public path should be relative (with dot slash ./).
   *            If static server is http-server (Node), the public path should be absolute (with slash /).
   * The value of publicPath can also be set to an empty string ('') or a relative path (./) so that all assets are
   * linked using relative paths. This allows the built bundle to be deployed under any public path,
   * or used in a file system based environment like a Cordova hybrid app.
   */
  publicPath: generatePublicPath(),
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    // FIXME: Disable to open browser automatically,
    //  due to error: URIError: Failed to decode param '/%3C%=%20BASE_URL%20%%3Efavicon.ico'
    // open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    /**
     * ATTENTION: Proxy does not work, if environment is not development.
     */
    proxy: proxyConfiguration
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: getAppName(),
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack (config) {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
    // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      )

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config.plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }]).end()
          config.optimization.splitChunks({
            chunks: 'all',
            cacheGroups: {
              libs: {
                name: 'chunk-libs',
                test: /[\\/]node_modules[\\/]/,
                priority: 10,
                chunks: 'initial' // only package third parties that are initially dependent
              },
              elementUI: {
                name: 'chunk-elementUI', // split elementUI into a single package
                priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
              },
              commons: {
                name: 'chunk-commons',
                test: resolve('src/components'), // can customize your rules
                minChunks: 3, //  minimum common number
                priority: 5,
                reuseExistingChunk: true
              }
            }
          })
          config.optimization.runtimeChunk('single')
        })
  }
}
