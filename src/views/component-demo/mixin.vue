<template>
  <div class="mixin-container">
    <md-input v-model="title" icon="search" name="title" placeholder="Enter title">
      Title
    </md-input>
    <el-button v-waves type="primary">
      Waves Button
    </el-button>
    <heading text="Heading 1"/>
    <heading text="Heading 2" :level="2"/>
  </div>
</template>

<script>
import MdInput from '@/components/MDinput'
import waves from '@/directives/waves/index'
import Heading from '@/components/Heading'

export default {
  name: 'Mixin',
  components: {
    MdInput,
    Heading
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

<style lang="scss" scoped>
.mixin-container {
  padding: 20px;
}
</style>
