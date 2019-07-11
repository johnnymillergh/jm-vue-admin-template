<template>
  <el-row class="heading-container">
    <h1 :class="'heading-container-level'+level">{{ text }}</h1>
  </el-row>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: 'Heading',
      required: true
    },
    level: {
      type: Number,
      default: 1,
      required: false
    }
  },
  name: 'Heading',
  data () {
    return {}
  }
}
</script>

<style scoped>
.heading-container {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
  margin-bottom: 10px;
}

.heading-container-level1 {
  color: #007DFF;
  font-size: 18px;
  line-height: 16px;
  font-weight: bolder;
  border-left: 4px solid #007DFF;
  padding-left: 16px;
  margin: 8px 16px 8px 0;
}

.heading-container-level2 {
  color: #007DFF;
  font-size: 16px;
  line-height: 16px;
  font-weight: bolder;
  border-left: 4px solid #007DFF;
  padding-left: 16px;
  margin: 8px 16px 8px 0;
}
</style>
