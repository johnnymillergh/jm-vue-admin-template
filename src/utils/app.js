const AppUtil = {}

/**
 * Get project property object.
 * @return {Object} An object contains project properties.
 * @author Johnny Miller (鍾俊), e-mail: johnnysviva@outlook.com
 * @date 2019-04-04
 * @time 15:36
 */
AppUtil.getProjectProperty = function () {
  return JSON.parse(unescape(process.env.PACKAGE_JSON))
}

export default AppUtil
