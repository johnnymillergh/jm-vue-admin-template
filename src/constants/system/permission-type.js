class Enum {
  constructor (type, description) {
    this.type = type
    this.description = description
    // Prevents the modification of existing property attributes and values,
    // and prevents the addition of new properties.
    Object.freeze(this)
  }
}

const PermissionType = {
  /**
   * Controller
   */
  CONTROLLER: new Enum(0, 'Controller'),
  /**
   * Page
   */
  PAGE: new Enum(1, 'Page'),
  /**
   * Button
   */
  BUTTON: new Enum(2, 'Button (API)'),
  /**
   * Get array of permission type.
   * @return {Array} an array of permission type.
   */
  getArray: () => {
    const array = []
    Object.keys(PermissionType).forEach(statusKey => {
      if (typeof PermissionType[statusKey] !== 'function') {
        array.push(PermissionType[statusKey])
      }
    })
    return array
  }
}

Object.freeze(PermissionType)
export default PermissionType
