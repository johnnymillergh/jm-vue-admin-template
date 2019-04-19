import { get } from '@/utils/request'

const SecurityAndPermission = {
  getController: () => get('/apiManagement/getController'),
  getApiByControllerClass: params => get('/apiManagement/getApiByControllerClass', params),
  getApiAnalysis: params => get('/apiManagement/getApiAnalysis', params)
}

export default SecurityAndPermission
