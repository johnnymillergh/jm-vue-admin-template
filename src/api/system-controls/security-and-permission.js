import { get, post } from '@/utils/request'

const SecurityAndPermission = {
  getController: () => get('/apiManagement/getController'),
  getApiByControllerClass: params => get('/apiManagement/getApiByControllerClass', params),
  getApiAnalysis: params => get('/apiManagement/getApiAnalysis', params),
  setApiInUse: params => post('/apiManagement/setApiInUse', params),
  setAllApiInUse: params => post('/apiManagement/setAllApiInUse', params),
  getApiList: params => post('/apiManagement/getApiList', params)
}

export default SecurityAndPermission
