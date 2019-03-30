'use strict'
module.exports = {
  PACKAGE_JSON: '"' + escape(JSON.stringify(require('../package.json'))) + '"'
}
