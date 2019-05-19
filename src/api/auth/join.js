import { get, post } from '@/utils/request'

const Join = {
  // Register an account
  resister: params => post('/auth/register', params),
  checkUsernameUniqueness: params => get('/auth/check-username-uniqueness', params),
  checkEmailUniqueness: params => get('/auth/check-email-uniqueness', params)
}

export default Join
