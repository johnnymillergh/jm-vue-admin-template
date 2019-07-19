<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name:{{ fullName }}</div>
    <div class="dashboard-text">roles:<span v-for="role in roles" :key="role">{{ role }}</span></div>
    <div class="dashboard-text">token:{{ token }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'fullName',
      'roles',
      'token'
    ])
  },
  mounted () {
    console.log()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 12px;
    line-height: 16px;
  }
}
</style>
