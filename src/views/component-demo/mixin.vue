<template>
  <div>
    <md-input v-model="title" icon="search" name="title" placeholder="Enter title">
      Title
    </md-input>
    <el-button v-waves type="primary">
      Waves Button
    </el-button>
  </div>
</template>

<script>
import MdInput from '@/components/MDinput'
import waves from '@/directives/waves/index'

export default {
  name: 'Mixin',
  components: {
    MdInput
  },
  directives: {
    waves
  },
  data () {
    return {
      title: null
    }
  }
}
</script>

<style scoped>

</style>
