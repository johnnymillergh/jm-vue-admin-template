import Cookies from 'js-cookie'

// Token key of JWT
export const TokenKey = 'Authorization'
export const UsernameKey = 'Username'
export const FullNameKey = 'FullName'

const AuthUtil = {}

// Token
AuthUtil.setToken = function (token) {
  return Cookies.set(TokenKey, token)
}

AuthUtil.getToken = function () {
  return Cookies.get(TokenKey)
}

AuthUtil.removeToken = function () {
  return Cookies.remove(TokenKey)
}

// Username
AuthUtil.setUsername = function (username) {
  return Cookies.set(UsernameKey, username)
}

AuthUtil.getUsername = function () {
  return Cookies.get(UsernameKey)
}

AuthUtil.removeUsername = function () {
  return Cookies.remove(UsernameKey)
}

// Full name
AuthUtil.setFullName = function (fullName) {
  return Cookies.set(FullNameKey, fullName)
}

AuthUtil.getFullName = function () {
  return Cookies.get(FullNameKey)
}

AuthUtil.removeFullName = function () {
  return Cookies.remove(FullNameKey)
}

export default AuthUtil
