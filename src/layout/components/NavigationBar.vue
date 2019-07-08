<template>
  <div class="navbar">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <breadcrumb/>
    <div class="right-menu">
      <search id="header-search" class="right-menu-item"/>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar class="user-avatar" fit="fill" :src="avatarUrl"/>
          <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown" style="width: 178px;" class="dropdown-list">
          <span class="signed-in-text">Signed in as</span>
          <p class="username">{{ fullName }}</p>
          <div class="line-separator"></div>
          <p class="user-status">💪 Coding & Building</p>
          <router-link class="inlineBlock" to="/">
            <el-dropdown-item divided>
              Home
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item>
            Your Profile
          </el-dropdown-item>
          <el-dropdown-item>
            Settings
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">Sign out</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Search from '@/components/HeaderSearch'
import User from '@/resource-api/user'
import StringUtil from '@/utils/string'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    Search
  },
  data () {
    return {
      resourceBaseApi: process.env.VUE_APP_RESOURCE_BASE_API,
      User: User
    }
  },
  computed: {
    ...mapGetters([
      'username',
      'fullName',
      'sidebar',
      'avatar'
    ]),
    avatarUrl () {
      if (StringUtil.isBlank(this.username)) {
        return '@/assets/avatar/man.png'
      }
      return this.User.getAvatar + this.username
    }
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('ToggleSideBar')
    },
    logout () {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      }).catch(error => {
        this.$message.error('Error: ' + error)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      height: 50px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        margin-right: 30px;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          /*border-radius: 10px;*/
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}

.signed-in-text {
  display: block;
  padding: 0 20px;
  font-weight: lighter;
  font-size: 14px;
  color: #24292e;
}

.username {
  display: block;
  padding: 0 20px;
  margin: 2px 0;
  width: 176px;
  font-weight: bold;
  font-size: 14px;
  color: #24292e;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-status {
  display: block;
  padding: 0 20px;
  margin: 10px 0;
  width: 176px;
  font-size: 12px;
  color: #24292e;
  text-overflow: ellipsis;
}

.line-separator {
  background-color: #e1e4e8;
  height: 1px;
  margin: 8px 1px;
}
</style>

