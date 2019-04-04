import Cookies from 'js-cookie'

// Token key of JWT
export const TokenKey = 'Authorization'

const AuthUtil = {}

AuthUtil.setToken = function (token) {
  return Cookies.set(TokenKey, token)
}

AuthUtil.getToken = function () {
  return Cookies.get(TokenKey)
}

AuthUtil.removeToken = function () {
  return Cookies.remove(TokenKey)
}

export default AuthUtil
