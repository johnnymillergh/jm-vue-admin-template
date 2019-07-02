class Status {
  constructor (status, description, label) {
    this.status = status
    this.description = description
    this.label = label
    // Prevents the modification of existing property attributes and values,
    // and prevents the addition of new properties.
    Object.freeze(this)
  }
}

const UserStatus = {
  /**
   * Enabled user
   */
  ENABLED: new Status(1, 'Enabled user', 'ENABLED'),
  /**
   * Disabled user
   */
  DISABLED: new Status(0, 'Disabled user', 'DISABLED'),
  /**
   * Get array of user status.
   * @return {Array} an array of user status.
   */
  getArray: () => {
    const array = []
    Object.keys(UserStatus).forEach(statusKey => {
      if (typeof UserStatus[statusKey] !== 'function') {
        array.push(UserStatus[statusKey])
      }
    })
    return array
  }
}

Object.freeze(UserStatus)
export default UserStatus
