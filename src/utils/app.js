/**
 * Get project property object.
 * @return {Object} An object contains project properties.
 */
export function getProjectProperty () {
  return JSON.parse(unescape(process.env.PACKAGE_JSON))
}
