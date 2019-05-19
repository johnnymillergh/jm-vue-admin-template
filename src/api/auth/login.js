import { get, post } from '@/utils/request'

const Login = {
  validateUsername: params => get('/auth/validate-username/' + params, null),
  login: params => post('/auth/login', params)
}

export default Login
