<template>
  <div class="navbar">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <breadcrumb/>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
        <i class="el-icon-caret-bottom"/>
      </div>
      <el-dropdown-menu slot="dropdown" style="width: 178px;">
        <span class="signed-in-text">Signed in as</span>
        <p class="username">{{ username }}</p>
        <div class="line-separator"/>
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
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data () {
    return {
      username: 'Johnny Miller\'s Testing Username'
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
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
  line-height: 50px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);

  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }

  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }

  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;

    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      line-height: initial;

      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }

      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
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

