<template>
  <el-card class="multi-window-container">
    <h1>Hi, there. This is a main window</h1>
    <p>Here is re result from sub window: {{ myData1 }}</p>
    <el-button @click="openNewWindow1">Open a New Window (1)</el-button>
  </el-card>
</template>

<script>
import MultiWindow from '@/mixins/multi-window'

export default {
  name: 'multi-window',
  mixins: [MultiWindow],
  data () {
    return {
      myData1: ''
    }
  },
  methods: {
    openNewWindow1 () {
      this.openWindow('/component-demo/sub-window', { callback: 'concatString' })
    },
    concatString (args) {
      this.myData1 = JSON.stringify(args)
    }
  }
}
</script>

<style lang="scss" scoped>
.multi-window-container {
  margin: 20px;
}
</style>
