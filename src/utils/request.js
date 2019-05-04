import axios from 'axios'
import store from '@/store'
import AuthUtil, { TokenKey } from '@/utils/auth'
import UniversalStatus from '@/constants/system/universal-status'
import { MessageBox, Notification } from 'element-ui'

// 1. Create an axios instance
const service = axios.create({
  // Base URL of API
  baseURL: process.env.VUE_APP_BASE_API,
  // Request timeout: 30s
  timeout: 30000
})

// 2. Request interceptor's configuration
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      // Send request with JWT
      config.headers[TokenKey] = AuthUtil.getToken()
    }
    config.params
    return config
  },
  error => {
    // Do something with request error
    console.error(error) // for debug
    Notification({
      title: 'Request Error',
      message: 'Error message: ' + error,
      type: 'error',
      duration: 5 * 1000,
      showClose: true
    })
    return Promise.reject(error)
  }
)

// 3. Response interceptor's configuration
service.interceptors.response.use(
  response => {
    const resp = response.data
    switch (resp.status) {
      case UniversalStatus.SUCCESS.code:
        return Promise.resolve(resp)
      case UniversalStatus.FAILURE.code:
        return Promise.reject(resp.message)
      case UniversalStatus.WARNING.code:
        return Promise.reject(resp.message)
      case UniversalStatus.TOKEN_EXPIRED.code:
        return onLogout(resp)
      case UniversalStatus.TOKEN_PARSE_ERROR.code:
        return onLogout(resp)
      case UniversalStatus.TOKEN_OUT_OF_CONTROL.code:
        return onLogout(resp)
      default:
        return Promise.reject(resp.message)
    }
  },
  error => {
    console.error('Error occurred when getting response. ', error)
    Notification({
      title: 'Response-Handling Error',
      message: 'Error occurred when getting response. ' + error.message,
      type: 'error',
      duration: 5 * 1000,
      showClose: true
    })
    return Promise.reject(error)
  }
)

/**
 * On logout. Make a toast and reload page.
 * @param resp response body
 * @return {Promise<string>} rejected reason
 */
function onLogout (resp) {
  MessageBox.confirm(
    'Your account has been logged out. Continue to stay or sign in again.',
    'Activity Warning',
    {
      confirmButtonText: 'Sign in again',
      cancelButtonText: 'Cancel',
      type: 'warning'
    }
  ).then(() => {
    store.dispatch('FedLogOut').then(() => {
      // Reload page
      location.reload()
    })
  })
  return Promise.reject(resp.message)
}

/**
 * Send a GET request.
 * @param url URL
 * @param params Params
 * @return {Promise<any>} Response data
 */
export const get = function (url, params) {
  return new Promise((resolve, reject) => {
    service.get(url, {
      params: params
    }).then(resp => {
      resolve(resp)
    }).catch(rejectedReason => {
      reject(rejectedReason)
    })
  })
}

/**
 * Send a POST request.
 * @param url URL
 * @param params Params
 * @return {Promise<any>} Response data
 */
export function post (url, params) {
  return new Promise((resolve, reject) => {
    service.post(url, params)
      .then(resp => {
        resolve(resp)
      })
      .catch(rejectedReason => {
        reject(rejectedReason)
      })
  })
}
