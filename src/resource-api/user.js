const User = {
  getAvatar: process.env.VUE_APP_RESOURCE_BASE_API + '/user/get-avatar?username=',
  uploadAvatar: process.env.VUE_APP_RESOURCE_BASE_API + '/user/update-avatar'
}

export default User
