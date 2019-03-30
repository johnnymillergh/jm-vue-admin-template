import { post, get } from '@/utils/request'

export const join = {
  // Register an account
  resister: params => post('/auth/register', params),
  checkUsernameUniqueness: params => get('/auth/checkUsernameUniqueness', params),
  checkEmailUniqueness: params => get('/auth/checkEmailUniqueness', params)
}
