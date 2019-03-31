import Cookies from 'js-cookie'

// Token key of JWT
export const TokenKey = 'Authorization'

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function getToken () {
  return Cookies.get(TokenKey)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}
