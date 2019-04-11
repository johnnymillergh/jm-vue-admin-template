import { get } from '@/utils/request'

const SecurityAndPermission = {
  getController: () => get('/apiManagement/getController'),
  getApiByControllerClass: params => get('/apiManagement/getApiByControllerClass', params)
}

export default SecurityAndPermission
