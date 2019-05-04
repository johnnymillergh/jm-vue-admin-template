/**
 * Universal Status.
 * @author Johnny Miller (鍾俊), e-mail: johnnysviva@outlook.com
 * @date 2019-03-30
 * @time 11:56
 */
class Status {
  constructor (code, message) {
    this.code = code
    this.message = message
    // Prevents the modification of existing property attributes and values,
    // and prevents the addition of new properties.
    Object.freeze(this)
  }
}

/**
 * Universal Status Enumerations.
 * @author Johnny Miller (鍾俊), e-mail: johnnysviva@outlook.com
 * @date 2019-03-30
 * @time 12:15
 */
const UniversalStatus = {
  // Successful
  /**
   * Success
   */
  SUCCESS: new Status(200, 'Success'),
  /**
   * Failure
   */
  FAILURE: new Status(250, 'Failure'),
  /**
   * Warning
   */
  WARNING: new Status(251, 'Warning'),

  // Client error
  /**
   * Unauthorized
   */
  UNAUTHORIZED: new Status(401, 'Unauthorized. The requester is not authorized to access the resource.'),
  /**
   * Forbidden
   */
  FORBIDDEN: new Status(403, 'Forbidden. The request was formatted correctly' +
    ' but the server is refusing to supply the requested resource.'),
  /**
   * Not found
   */
  NOT_FOUND: new Status(404, 'Not found. The resource could not be found.'),
  /**
   * Method not allowed
   */
  METHOD_NOT_ALLOWED: new Status(405, 'The resource was requested using a method that is not allowed.'),
  /**
   * Bad request
   */
  BAD_REQUEST: new Status(400, 'Bad request.'),
  /**
   * Param not matched
   */
  PARAM_NOT_MATCH: new Status(460, 'Param not matched. The request could not be fulfilled' +
    ' due to the incorrect syntax of the request.'),
  /**
   * Param not null
   */
  PARAM_NOT_NULL: new Status(461, 'Param not null.'),
  /**
   * Param invalid
   */
  PARAM_INVALID: new Status(462, 'Param invalid.'),
  /**
   * User disabled
   */
  USER_DISABLED: new Status(463, 'User disabled.'),

  // Server error
  /**
   * Error or failure
   */
  ERROR: new Status(500, 'Error. A generic status for an error in the server itself.'),
  /**
   * Role not found
   */
  ROLE_NOT_FOUND: new Status(552, 'Role not found.'),
  /**
   * Username or password error
   */
  USERNAME_OR_PASSWORD_ERROR: new Status(553, 'Username or password error.'),
  /**
   * Token expired
   */
  TOKEN_EXPIRED: new Status(554, 'Token expired.'),
  /**
   * Token parse error
   */
  TOKEN_PARSE_ERROR: new Status(555, 'Token parse error.'),
  /**
   * Token out of control
   */
  TOKEN_OUT_OF_CONTROL: new Status(556, 'Token out of control. ' +
    'Current user has logged in before. Please try to reset current password or sign in again.'),
  /**
   * Kick out self warning. Cannot kick self out.
   */
  KICK_OUT_SELF: new Status(557, 'Cannot kick self out. Please try to sign in again.'),
  /**
   * Get status by code.
   * @param code {Number} Code that server responded.
   * @throws Status not found error if the argument code is not defined.
   */
  getStatusByCode: code => {
    let status = null
    Object.keys(UniversalStatus).forEach(statusKey => {
      if (typeof UniversalStatus[statusKey] !== 'function' && UniversalStatus[statusKey].code === code) {
        status = UniversalStatus[statusKey]
      }
    })
    if (!status) {
      throw new Error('Status not found.')
    }
    return status
  }
}

Object.freeze(UniversalStatus)
export default UniversalStatus
