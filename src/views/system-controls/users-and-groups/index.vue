<template>
  <div class="app-container">
    <el-tabs @tab-click="onClickTab" type="border-card">
      <el-tab-pane label="Users">
        <transition name="el-zoom-in-top">
          <users v-show="showUsers"/>
        </transition>
      </el-tab-pane>
      <el-tab-pane label="Assign Role">
        <transition name="el-zoom-in-top">
          <assign-role v-show="showAssignRole"/>
        </transition>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Users from './components/Users'
import AssignRole from './components/AssignRole'

export default {
  name: 'UsersAndGroups',
  components: {
    Users,
    AssignRole
  },
  data () {
    return {
      showUsers: true,
      showAssignRole: false
    }
  },
  methods: {
    onClickTab (tab) {
      switch (tab.index) {
        case '0':
          this.showUsers = true
          this.showAssignRole = false
          break
        case '1':
          this.showAssignRole = true
          this.showUsers = false
          break
      }
    }
  }
}
</script>
