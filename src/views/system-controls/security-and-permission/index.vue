<template>
  <div class="app-container">
    <el-tabs @tab-click="onClickTab" type="border-card">
      <el-tab-pane label="Permission Controls">
        <transition name="el-zoom-in-top">
          <permission-controls v-show="showPermissionControls"/>
        </transition>
      </el-tab-pane>
      <el-tab-pane label="Role Controls">
        <transition name="el-zoom-in-top">
          <role-controls v-show="showRoleControls"/>
        </transition>
      </el-tab-pane>
      <el-tab-pane label="Authorization">
        <transition name="el-zoom-in-top">
          <authorization v-show="showAuthorization"/>
        </transition>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import PermissionControls from './components/PermissionControls'
import RoleControls from './components/RoleControls'
import Authorization from './components/Authorization'

export default {
  name: 'SecurityAndPermission',
  components: {
    PermissionControls,
    RoleControls,
    Authorization
  },
  data () {
    return {
      showPermissionControls: true,
      showRoleControls: false,
      showAuthorization: false
    }
  },
  methods: {
    onClickTab (tab) {
      switch (tab.index) {
        case '0':
          this.showPermissionControls = true
          this.showRoleControls = this.showAuthorization = false
          break
        case '1':
          this.showRoleControls = true
          this.showPermissionControls = this.showAuthorization = false
          break
        case '2':
          this.showAuthorization = true
          this.showRoleControls = this.showPermissionControls = false
          break
      }
    }
  }
}
</script>

<!--suppress CssUnusedSymbol -->
<style scoped>
/* Reset the element transfer component's width */
.el-transfer >>> .el-transfer-panel {
  width: 500px;
}
</style>
