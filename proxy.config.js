module.exports = {
  '/auth': {
    target: `${process.env.VUE_APP_BASE_URL}`,
    changeOrigin: true,
    pathRewrite: {
      '^/auth': `/${process.env.VUE_APP_BASE_API}/auth`
    }
  },
  '/apiManagement': {
    target: `${process.env.VUE_APP_BASE_URL}`,
    changeOrigin: true,
    pathRewrite: {
      '^/apiManagement': `/${process.env.VUE_APP_BASE_API}/apiManagement`
    }
  },
  '/role': {
    target: `${process.env.VUE_APP_BASE_URL}`,
    changeOrigin: true,
    pathRewrite: {
      '^/role': `/${process.env.VUE_APP_BASE_API}/role`
    }
  }
}
