<template>
  <el-card class="sub-window-container">
    <h1>Hi, there. This is a sub window</h1>
    <el-button @click="backToLastWindow">Back to Last Window</el-button>
  </el-card>
</template>

<script>
import MultiWindow from '@/mixins/multi-window'

export default {
  mixins: [MultiWindow],
  name: 'index',
  methods: {
    backToLastWindow () {
      this.windowBack({
        id: Math.ceil(Math.random() * 100),
        name: 'Hello'
      })
    }
  }
}
</script>

<style scoped>
.sub-window-container {
  margin: 20px;
}
</style>
