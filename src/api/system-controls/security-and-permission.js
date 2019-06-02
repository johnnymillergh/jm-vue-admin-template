import { get, legacyPost, post } from '@/utils/request'

const SecurityAndPermission = {
  getController: () => get('/api-management/get-controller'),
  getApiByControllerClass: params => get('/api-management/get-api-by-controller-class', params),
  getApiAnalysis: params => get('/api-management/get-api-analysis', params),
  setApiInUse: params => post('/api-management/set-api-in-use', params),
  setAllApiInUse: params => legacyPost('/api-management/set-all-api-in-use', params),
  getApiList: params => post('/api-management/get-api-list', params),
  getRoleList: params => post('/role/get-list', params),
  checkRoleName: params => post('/role/check-role-name', params),
  createRole: params => post('/role/create-role', params),
  editRole: params => post('/role/edit-role', params),
  searchRole: params => get('/role/search-role', params),
  getRoles: params => post('/authorization/get-roles', params),
  getPermissions: params => post('/authorization/get-permissions', params),
  submitAuthorization: params => post('/submit-authorization', params)
}

export default SecurityAndPermission
