import { post, get } from '@/utils/request'

const Join = {
  // Register an account
  resister: params => post('/auth/register', params),
  checkUsernameUniqueness: params => get('/auth/checkUsernameUniqueness', params),
  checkEmailUniqueness: params => get('/auth/checkEmailUniqueness', params)
}

export default Join
