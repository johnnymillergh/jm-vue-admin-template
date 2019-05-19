import { get, legacyPost, post } from '@/utils/request'

const SecurityAndPermission = {
  getController: () => get('/apiManagement/getController'),
  getApiByControllerClass: params => get('/apiManagement/getApiByControllerClass', params),
  getApiAnalysis: params => get('/apiManagement/getApiAnalysis', params),
  setApiInUse: params => post('/apiManagement/setApiInUse', params),
  setAllApiInUse: params => legacyPost('/apiManagement/setAllApiInUse', params),
  getApiList: params => post('/apiManagement/getApiList', params),
  getRoleList: params => post('/role/get-list', params),
  checkRoleName: params => get('/role/check-role-name', params),
  createRole: params => post('/role/create-role', params),
  searchRole: params => get('/role/search-role', params)
}

export default SecurityAndPermission
