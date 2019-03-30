<template>
  <div class="footer-container">
    <h1 class="footer-font">
      {{ appAuthorArray[0]+' '+appAuthorArray[1]+' '+appAuthorArray[2] }} © {{ currentYear }}
    </h1>
    <h1 class="footer-font">
      Version {{ appVersion }}
    </h1>
  </div>
</template>

<script>
import { formatDate } from '@/utils/datetime'

export default {
  name: 'LoginFooter',
  data () {
    return {
      appAuthorArray: this.$store.state.app.author.split(' '),
      appVersion: this.$store.state.app.appVersion,
      currentYear: formatDate(new Date(), 'yyyy')
    }
  }
}
</script>

<style scoped>
.footer-container {
}

.footer-font {
  font-size: 12px;
  text-align: center;
  color: #6a737d;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
}
</style>
