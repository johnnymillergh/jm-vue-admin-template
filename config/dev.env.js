'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // Base API of development left blank. proxyTable will work.
  BASE_API: '""',
})
