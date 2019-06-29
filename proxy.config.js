module.exports = {
  '/auth': {
    target: `${process.env.VUE_APP_BASE_URL}`,
    changeOrigin: true,
    pathRewrite: {
      '^/auth': `/${process.env.VUE_APP_BASE_API}/auth`
    }
  },
  '/api-management': {
    target: `${process.env.VUE_APP_BASE_URL}`,
    changeOrigin: true,
    pathRewrite: {
      '^/api-management': `/${process.env.VUE_APP_BASE_API}/api-management`
    }
  },
  '/role': {
    target: `${process.env.VUE_APP_BASE_URL}`,
    changeOrigin: true,
    pathRewrite: {
      '^/role': `/${process.env.VUE_APP_BASE_API}/role`
    }
  },
  '/user': {
    target: `${process.env.VUE_APP_BASE_URL}`,
    changeOrigin: true,
    pathRewrite: {
      '^/user': `/${process.env.VUE_APP_BASE_API}/user`
    }
  }
}
