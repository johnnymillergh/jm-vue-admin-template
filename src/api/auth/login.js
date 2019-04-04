import { get, post } from '@/utils/request'

const Login = {
  validateUsername: params => get('/auth/validateUsername/' + params, null),
  login: params => post('/auth/login', params)
}

export default Login
