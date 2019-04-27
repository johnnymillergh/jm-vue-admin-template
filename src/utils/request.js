import axios from 'axios'
import store from '@/store'
import AuthUtil, { TokenKey } from '@/utils/auth'
import UniversalStatus from '@/constants/system/universal-status'
import { Message, MessageBox, Notification } from 'element-ui'

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
    if (resp.status !== UniversalStatus.SUCCESS.code) {
      console.error('Server responded an error (%s). Response: ', resp.timestamp, resp)

      if (resp.status === UniversalStatus.TOKEN_PARSE_ERROR.code ||
        resp.status === UniversalStatus.TOKEN_OUT_OF_CONTROL.code ||
        resp.status === UniversalStatus.TOKEN_EXPIRED.code) {
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
            // 为了重新实例化vue-router对象 避免bug
            location.reload()
          })
        })
      }
      const rejectedReason = `Server responded an error! ` +
        `Status: ${resp.status} (${UniversalStatus.getStatusByCode(resp.status).message}), message: ${resp.message}`
      Message.error(rejectedReason)
      return Promise.reject(resp.message)
    } else {
      return Promise.resolve(resp)
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
