'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VUE_APP_I18N_LOCALE: '"en"',
  VUE_APP_I18N_FALLBACK_LOCALE: '"en"'
})
