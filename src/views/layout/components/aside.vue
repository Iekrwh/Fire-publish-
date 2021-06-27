<template>
    <el-menu
    class = 'nav-menu el-menu-vertical-demo'
      default-active="/"
      background-color="#002033"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      :collapse='isCollapse'
      >
      <!-- :collapse 折叠导航栏 绑定一个布尔值 -->
        <!-- @open="handleOpen"
      @close="handleClose" 为多级菜单打开关闭的绑定方法 -->
       <!-- default-active 当前被激活的按钮  对应为子元素的index -->
       <!-- active-text-color为按钮激活后的颜色 -->
      <!-- 在menu中 加上router 开启路由器模式 子元素的index为跳转链接 -->
       <el-menu-item index="/">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/article">
        <i class="el-icon-document"></i>
        <span slot="title">内容管理</span>
      </el-menu-item>
      <el-menu-item index="/image" >
        <i class="el-icon-picture"></i>
        <span slot="title">素材管理</span>
      </el-menu-item>
      <el-menu-item index="/publish">
        <i class="el-icon-document-add"></i>
        <span slot="title">发布文章</span>
      </el-menu-item>
       <el-menu-item index="/comment">
        <i class="el-icon-reading"></i>
        <span slot="title">评论管理</span>
      </el-menu-item>
       <el-menu-item index="/fans">
        <i class="el-icon-s-custom"></i>
        <span slot="title">粉丝管理</span>
      </el-menu-item>
       <el-menu-item index="/setting">
        <i class="el-icon-setting"></i>
        <span slot="title">个人设置</span>
      </el-menu-item>
    </el-menu>
</template>

<script>

export default {
  name: 'AppAside',
  components: {},
  props: ['is-collapse'], // 组件给子组件传值可以用props
  data () {
    return {
    //   isCollapse: false
    }
  },
  computed: {},
  watch: {},
  methods: {

  },
  created () {},
  mounted () {},
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
// 要指定宽度不然动画会卡顿
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
