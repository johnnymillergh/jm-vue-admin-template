import { get, post } from '@/utils/request'

export const login = {
  validateUsername: params => get('/auth/validateUsername/' + params, null),
  login: params => post('/auth/login', params)
}
