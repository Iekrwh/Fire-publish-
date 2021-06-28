<template>
  <div class="fans-container">
    <div style="width: 500px; height: 500px" ref="chart"></div>
    <h2>地图图例</h2>
    <map-demo></map-demo>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import MapDemo from './components/map'

export default {
  name: 'Fans',
  components: { MapDemo },
  data () {
    return {

    }
  },
  computed: {
  },
  watch: {},
  methods: {
    // createChart () {
    //   var myChart = echarts.init(this.$refs.chart)

    //   // 指定图表的配置项和数据
    //   var option = {
    //     title: {
    //       text: 'ECharts 入门示例'
    //     },
    //     tooltip: {},
    //     legend: {
    //       data: ['销量']
    //     },
    //     xAxis: {
    //       data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    //     },
    //     yAxis: {},
    //     series: [{
    //       name: '销量',
    //       type: 'bar',
    //       data: [5, 20, 36, 10, 10, 20]
    //     }]
    //   }

    //   // 使用刚指定的配置项和数据显示图表。
    //   myChart.setOption(option)
    // }
  },
  created () { },
  mounted () {
    // this.createChart()
    var myChart = echarts.init(this.$refs.chart)

    // 指定图表的配置项和数据
    var option = {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    }

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option)
  },
  beforeCreate () { },
  beforeMount () { },
  beforeUpdate () { },
  updated () { },
  beforeDestroy () { },
  destroyed () { },
  activated () { }
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
</style>
