import Login from '@/api/auth/login'
import AuthUtil from '@/utils/auth'

const user = {
  state: {
    token: AuthUtil.getToken(),
    username: AuthUtil.getUsername(),
    fullName: AuthUtil.getFullName(),
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_TOKEN_TYPE: (state, tokenType) => {
      state.tokenType = tokenType
    },
    SET_USERNAME: (state, username) => {
      state.username = username
    },
    SET_FULL_NAME: (state, fullName) => {
      state.fullName = fullName
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    Login ({ commit }, params) {
      return new Promise((resolve, reject) => {
        Login.login(params).then(response => {
          const token = response.data.tokenType + ' ' + response.data.token
          const username = response.data.username
          const fullName = response.data.fullName
          AuthUtil.setToken(token)
          AuthUtil.setUsername(username)
          AuthUtil.setFullName(fullName)
          commit('SET_TOKEN', token)
          commit('SET_USERNAME', username)
          commit('SET_FULL_NAME', fullName)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_ROLES', 'Admin')
        resolve({
          data: {
            roles: ['admin'],
            introduction: 'I am a super administrator',
            avatar: '',
            name: 'Super Admin'
          }
        })
      })
    },

    // 登出
    LogOut ({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        AuthUtil.removeToken()
        resolve()
      })
    },

    // 前端 登出
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        AuthUtil.removeToken()
        resolve()
      })
    }
  }
}

export default user
