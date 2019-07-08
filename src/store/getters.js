const getters = {
  sidebar: state => state.app.sidebar,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  device: state => state.app.device,
  token: state => state.user.token,
  tokenType: state => state.user.tokenType,
  username: state => state.user.username,
  fullName: state => state.user.fullName,
  avatar: state => state.user.avatar,
  roles: state => state.user.roles,
  permission_routers: state => state.permission.routers,
  appName: state => state.app.appName,
  appVersion: state => state.app.appVersion,
  description: state => state.app.description,
  author: state => state.app.author
}
export default getters
