<template>
  <div class="step3-container">
    <el-row type="flex" justify="center">
      <el-progress type="circle" :percentage="23" status="text">23%</el-progress>
    </el-row>
    <el-row type="flex" justify="center">
      <p class="status-message">Hello! This is a status message</p>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Step3'
}
</script>

<style lang="scss" scoped>
.step3-container {
  .status-message {
    padding-top: 24px;
    font-size: 24px;
  }
}
</style>
