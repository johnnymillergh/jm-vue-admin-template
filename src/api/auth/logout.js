import { post } from '@/utils/request'

const Logout = {
  logout: params => post('/auth/logout', params)
}

export default Logout
