<template>
  <div>
    <h1 class="footer-font">
      {{ appAuthorArray[0]+' '+appAuthorArray[1]+' '+appAuthorArray[2] }} © {{ getYearRange() }}
    </h1>
    <h1 class="footer-font">
      Version {{ appVersion }}<span v-show="shoeEnvironment">{{ environmentAlias }}</span>
    </h1>
  </div>
</template>

<script>
import DatetimeUtil from '@/utils/datetime'
// Alternative way to import DatetimeUtil dynamically by using Webpack's require() method.
// const DatetimeUtil = require('@/utils/datetime').default

export default {
  name: 'LoginFooter',
  data () {
    return {
      appAuthorArray: this.$store.state.app.author.split(' '),
      appVersion: this.$store.state.app.appVersion,
      startYear: '2019',
      currentYear: DatetimeUtil.formatDate(new Date(), 'yyyy'),
      shoeEnvironment: false,
      environmentAlias: null
    }
  },
  mounted () {
    this.shoeEnvironment = process.env.VUE_APP_ENV !== 'prod'
    this.environmentAlias = process.env.VUE_APP_ENV !== 'prod' ? ' (' + process.env.VUE_APP_ENV + ')' : null
  },
  methods: {
    getYearRange () {
      if (this.currentYear === this.startYear) {
        return this.currentYear
      }
      return this.startYear + '-' + this.currentYear
    }
  }
}
</script>

<style scoped>
.footer-font {
  font-size: 12px;
  text-align: center;
  color: #969fa9;
}
</style>
