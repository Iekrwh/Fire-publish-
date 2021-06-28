<template>
    <div class="bmap" id='container'></div>
</template>

<script>

export default {
  name: 'bMap',
  components: {},
  data () {
    return {

    }
  },
  computed: {},
  watch: {},
  methods: {},
  created () {},
  mounted () {
    var map = new window.BMap.Map('container') // 创建地图实例  第三全局数据要加window.前缀

    var point = new window.BMap.Point(116.404, 39.915) // 地图中心坐标

    map.centerAndZoom(point, 15) // 实例化

    window.setTimeout(function () { // 交互操作
      map.panTo(new window.BMap.Point(116.409, 39.918))
    }, 2000)
  },
  beforeCreate () {},
  beforeMount () {},
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  destroyed () {},
  activated () {}
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.bmap {
    width: 800px;
    height: 600px;
}
</style>
