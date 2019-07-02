<template>
  <div class="assign-role-container">
    <el-row type="flex" justify="space-between" style="height: 545px">
      <el-col :span="12" :class="activeUserKeyframes">
        <el-row type="flex" justify="center">
          <h1 class="heading-text">Choose User</h1>
        </el-row>
        <el-row type="flex" justify="center">
          <el-select class="role-select"
                     v-model="selectedUser"
                     v-lazy-select="lazyLoadUser"
                     :disabled="submitDisabled"
                     value-key="id"
                     placeholder="Select"
                     collapse-tags
                     filterable>
            <el-option v-for="(item,index) in userList" :key="index" :label="item.username" :value="item"/>
          </el-select>
        </el-row>
        <el-row type="flex" justify="center">
          <el-avatar class="user-avatar"
                     :size="256"
                     fit="fill"
                     src="/jm-vue-admin-template-dev/static/img/man.f0b3abf1.png"/>
        </el-row>
      </el-col>
      <el-col :span="12" :class="activeRoleKeyframes">
        <el-row type="flex" justify="center">
          <h1 class="heading-text">Choose Role</h1>
        </el-row>
        <el-row type="flex" justify="center">
          <el-select class="role-select"
                     v-model="selectedRoles"
                     v-lazy-select="lazyLoadRole"
                     :disabled="submitDisabled"
                     value-key="id"
                     placeholder="Select"
                     multiple
                     collapse-tags
                     filterable>
            <el-option v-for="(item,index) in roleList" :key="index" :label="item.name" :value="item"/>
          </el-select>
        </el-row>
        <el-row type="flex" justify="center">
          <el-card class="selected-role-container" shadow="hover">
            <template v-for="(item,index) in selectedRoles">
              <el-tooltip :key="index" class="item" effect="dark" :content="item.description" placement="top-start">
                <el-tag class="selected-role-item"
                        :type="getTagType(item)"
                        @close="onCloseTag(index)"
                        @click="onClickTag(item)"
                        effect="dark"
                        closable>
                  {{item.name}}
                </el-tag>
              </el-tooltip>
            </template>
          </el-card>
        </el-row>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-button class="submit-button" type="success" @click="onClickSubmit" :disabled="submitDisabled">
        Assign role(s) to user
      </el-button>
    </el-row>
  </div>
</template>

<script>
import LazySelect from '@/directives/lazy-select'
import SecurityAndPermission from '@/api/system-controls/security-and-permission'

export default {
  name: 'AssignRole',
  directives: { LazySelect },
  data () {
    return {
      selectedUser: null,
      selectedRoles: [],
      tagTypes: ['', 'success', 'info', 'warning', 'danger'],
      userList: [],
      roleList: [],
      currentPageForUser: 1,
      currentPageForRole: 1,
      pageSize: 10,
      limitReachedForUser: false,
      limitReachedForRole: false,
      activeUserKeyframes: '',
      activeRoleKeyframes: '',
      submitDisabled: false
    }
  },
  mounted () {
    const params1 = {
      currentPage: this.currentPageForUser,
      pageSize: this.pageSize
    }
    SecurityAndPermission.getUserListForSelection(params1).then(response => {
      if (response.data.userList.length > 0) {
        this.userList = [...this.userList, ...response.data.userList]
      } else {
        this.limitReachedForUser = true
      }
    }).catch(error => {
      this.$message.error(error)
      console.error(error)
    })
    const params2 = {
      currentPage: this.currentPageForRole,
      pageSize: this.pageSize
    }
    SecurityAndPermission.getRoles(params2).then(response => {
      if (response.data.roleList.length > 0) {
        this.roleList = [...this.roleList, ...response.data.roleList]
      } else {
        this.limitReachedForRole = true
      }
    }).catch(error => {
      this.$message.error(error)
      console.error('Error occurred.', error)
    })
  },
  methods: {
    lazyLoadUser () {
      if (this.limitReachedForUser) {
        return
      }
      const params = {
        currentPage: ++this.currentPageForUser,
        pageSize: this.pageSize
      }
      SecurityAndPermission.getUserListForSelection(params).then(response => {
        if (response.data.userList.length > 0) {
          this.userList = [...this.userList, ...response.data.userList]
        } else {
          this.limitReachedForUser = true
        }
      }).catch(error => {
        this.$message.error(error)
        console.error('Error occurred.', error)
      })
    },
    lazyLoadRole () {
      if (this.limitReachedForRole) {
        return
      }
      const params = {
        currentPage: ++this.currentPageForRole,
        pageSize: this.pageSize
      }
      SecurityAndPermission.getRoles(params).then(response => {
        if (response.data.roleList.length > 0) {
          this.roleList = [...this.roleList, ...response.data.roleList]
        } else {
          this.limitReachedForRole = true
        }
      }).catch(error => {
        this.$message.error(error)
        console.error('Error occurred.', error)
      })
    },
    getTagType (selectedRole) {
      return this.tagTypes[selectedRole.id % 5]
    },
    onClickTag (selectedRole) {
      // TODO: need to add click event to open a dialog showing the permissions which has been authorized to the role
      console.error('need to add click event to open a dialog showing the permissions which has been authorized to the role',
        selectedRole)
    },
    onCloseTag (index) {
      this.selectedRoles.splice(index, 1)
    },
    onClickSubmit () {
      if (!this.selectedUser) {
        this.$message.warning('Select one user')
        return
      }
      if (this.selectedRoles.length === 0) {
        this.$message.warning('Select role(s)')
        return
      }
      this.submitDisabled = true
      this.activeUserKeyframes = 'play-user-keyframes'
      this.activeRoleKeyframes = 'play-role-keyframes'
      const params = {
        username: this.selectedUser.username,
        userId: this.selectedUser.id,
        roleIdList: this.selectedRoles.map(role => {
          return role.id
        })
      }
      setTimeout(() => {
        SecurityAndPermission.assignRoleToUser(params).then(response => {
          this.$message.success(response.message)
          this.clearSelection()
        }).catch(error => {
          this.$message.error(error)
          console.error('Error occurred when assign role(s) to user', error)
        }).finally(() => {
          this.restorePage()
        })
      }, 1800)
    },
    /**
     * Restore page to initial state when error occurred, delayed 2 s
     */
    restorePage () {
      setTimeout(() => {
        this.submitDisabled = false
        this.activeUserKeyframes = 'play-user-keyframes-restore'
        this.activeRoleKeyframes = 'play-role-keyframes-restore'
      }, 2000)
    },
    clearSelection () {
      this.selectedUser = null
      this.selectedRoles = []
    }
  }
}
</script>

<style lang="scss" scoped>
@keyframes user-animation {
  0% {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
  }
  100% {
    position: absolute;
    top: 0;
    left: 25%;
    z-index: 2;
  }
}

@keyframes user-animation-restore {
  0% {
    position: absolute;
    top: 0;
    left: 25%;
    z-index: 2;
  }
  100% {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
  }
}

@keyframes role-animation {
  0% {
    position: absolute;
    top: 0;
    right: 0;
    opacity: 1;
    z-index: 1;
  }
  100% {
    position: absolute;
    top: 0;
    right: 25%;
    opacity: 0;
    z-index: 1;
  }
}

@keyframes role-animation-restore {
  1% {
    position: absolute;
    top: 0;
    right: 25%;
    opacity: 0;
    z-index: 1;
  }
  100% {
    position: absolute;
    top: 0;
    right: 0;
    opacity: 1;
    z-index: 1;
  }
}

.assign-role-container {
  .heading-text {
    margin: 10px auto;
    font-size: 48px;
    font-weight: lighter;
  }

  .user-avatar {
    margin-top: 40px;
  }

  .play-user-keyframes {
    animation: user-animation 1.8s ease;
    animation-fill-mode: forwards;
  }

  .play-role-keyframes {
    animation: role-animation 1.8s ease;
    animation-fill-mode: forwards;
  }

  .play-user-keyframes-restore {
    animation: user-animation-restore 1.8s ease;
    animation-fill-mode: forwards;
  }

  .play-role-keyframes-restore {
    animation: role-animation-restore 1.8s ease;
    animation-fill-mode: forwards;
  }

  .role-select {
    width: 300px;
  }

  .selected-role-container {
    margin-top: 40px;
    width: 600px;
    height: 330px;
  }

  .selected-role-item {
    margin: 2px;
  }

  .submit-button {
    margin-top: 20px;
  }
}
</style>
