<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
// echarts theme
require('echarts/theme/macarons')

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '400px'
    },
    height: {
      type: String,
      default: '300px'
    },
    pieChartData: {
      required: true,
      default: [
        { value: 1, name: 'Idled' },
        { value: 1, name: 'In use' }
      ]
    }
  },
  watch: {
    pieChartData: {
      deep: true,
      handler (val) {
        this.setOption(val)
      }
    }
  },
  data () {
    return {
      chart: null
    }
  },
  mounted () {
    this.initChart()
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart () {
      this.chart = echarts.init(this.$el, 'macarons')
      // this.setOption()
    },
    setOption (pieChartData) {
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['In use', 'Idled']
        },
        calculable: true,
        series: [
          {
            name: 'API Analysis',
            type: 'pie',
            // roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '38%'],
            data: pieChartData,
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    }
  }
}
</script>
