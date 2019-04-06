<template>
  <div class="app-container">
    <el-tabs @tab-click="handleClick" type="border-card">
      <el-tab-pane label="Permission Controls">Permission Controls</el-tab-pane>
      <el-tab-pane label="Role Controls">Role Controls</el-tab-pane>
      <el-tab-pane label="Authorization">Authorization</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'SecurityAndPermission',
  data () {
    return {}
  },
  methods: {
    handleClick () {
    }
  }
}
</script>

<style scoped>

</style>
