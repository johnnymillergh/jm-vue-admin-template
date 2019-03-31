const getters = {
  sidebar: state => state.app.sidebar,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  device: state => state.app.device,
  token: state => state.user.token,
  tokenType: state => state.user.tokenType,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  permission_routers: state => state.permission.routers,
  appName: state => state.app.appName,
  appVersion: state => state.app.appVersion,
  description: state => state.app.description,
  author: state => state.app.author
}
export default getters
