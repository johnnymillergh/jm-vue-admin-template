<template>
  <hr :class="separatorStyle">
</template>

<script>
export default {
  name: 'LineSeparator',
  props: {
    separatorStyle: {
      type: String,
      default: 'gradient',
      required: false
    }
  }
}
</script>

<style scoped>
hr.normal {
  border: 0;
  height: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}

hr.gradient {
  border: 0;
  height: 1px;
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(119, 119, 127, 0.75), rgba(0, 0, 0, 0));
}
</style>
