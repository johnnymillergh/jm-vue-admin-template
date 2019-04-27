const AppUtil = {}

/**
 * Get project property object.
 * @return {Object} An object contains project properties.
 * @author Johnny Miller (鍾俊), e-mail: johnnysviva@outlook.com
 * @date 2019-04-04
 * @time 15:36
 */
AppUtil.getProjectProperty = function () {
  return JSON.parse(unescape(process.env.VUE_APP_PACKAGE_JSON))
}

/**
 * Get the name of app.
 * @return {string} Name of app
 */
AppUtil.getName = function () {
  return AppUtil.getProjectProperty().name
}

/**
 * Get the version of app.
 * @return {string} Version of app
 */
AppUtil.getVersionInfo = function () {
  return AppUtil.getProjectProperty().version
}

/**
 * Get the description of app.
 * @return {string} Description of app
 */
AppUtil.getDescription = function () {
  return AppUtil.getProjectProperty().description
}

/**
 * Get the author of app.
 * @return {string} Author of app
 */
AppUtil.getAuthor = function () {
  return AppUtil.getProjectProperty().author
}

export default AppUtil
