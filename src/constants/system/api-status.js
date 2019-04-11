class Status {
  constructor (status, description) {
    this.status = status
    this.description = description
    // Prevents the modification of existing property attributes and values,
    // and prevents the addition of new properties.
    Object.freeze(this)
  }
}

const ApiStatus = {
  /**
   * Idled API (not stored in db).
   */
  IDLED: new Status(0, 'Idled API (not stored in db)'),
  /**
   * API in used (stored in db).
   */
  IN_USED: new Status(1, 'API in used (stored in db)'),
  /**
   * Get array of api status.
   * @return {Array} an array of api status.
   */
  getArray: () => {
    const array = []
    Object.keys(ApiStatus).forEach(statusKey => {
      if (typeof ApiStatus[statusKey] !== 'function') {
        array.push(ApiStatus[statusKey])
      }
    })
    return array
  }
}

Object.freeze(ApiStatus)
export default ApiStatus
