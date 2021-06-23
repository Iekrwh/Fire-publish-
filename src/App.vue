<template>
  <div id="app">
    <h2>测试测试</h2>
     <el-input-number v-model="num" @change="handleChange" :min="10" :max="100" label="描述文字"></el-input-number>
    <!-- 路由出口 -->
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      num: 1
    }
  }
}
</script>

<style lang="less"></style>
