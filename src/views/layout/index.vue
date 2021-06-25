<template>
  <el-container class="layout-container">
    <el-aside width="auto" class="aside">
      <app-aside class="aside-menu" :is-collapse='isCollapse'/>
    </el-aside>
    <el-container>
      <el-header class="header">
        <div>
            <!-- calss样式处理 可以绑定一个对象 key值为class 当value布尔值为true启用 -->
          <i :class="{
              'el-icon-s-fold': isCollapse,
          'el-icon-s-unfold': !isCollapse}"
          @click="isCollapse = !isCollapse"></i>
          <span>基于vue2和elment开发的后台管理系统</span>
        </div>
        <el-dropdown>
            <div  class="avatr-warp"><img class="avatar" :src="user.photo" alt="">
            <span>{{user.name}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
            </div>
          <!-- <span class="el-dropdown-link">
            下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
          </span> -->
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>设置</el-dropdown-item>
            <!-- el组件默认是不识别原生事件的 除非内容做了处理  我们可以添加.native-->
            <el-dropdown-item @click.native="onLogout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppAside from './components/aside'
import { getUserProfile } from '@/api/user'

export default {
  name: 'LayoutIndex',
  components: {
    AppAside
  },
  data () {
    return {
      user: {}, // 当前用户的学校
      isCollapse: false // 侧边导航栏展开状态
    }
  },
  computed: {},
  watch: {},
  methods: {
    loadUserProfile () {
      getUserProfile().then(res => {
        // console.log(res)
        this.user = res.data.data
      })
    },
    onLogout () {
      this.$confirm('确认退出登陆?', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 把用户的登陆token清除
        window.localStorage.removeItem('user')

        // 跳转到登陆页面
        this.$router.push('/login')

        // 提示信息
        this.$message({
          type: 'success',
          message: '退出成功'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  },
  created () {
    this.loadUserProfile()
  },
  mounted () { },
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
.layout-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}

.aside {
  background-color: #d3dce6;
}

.aside-menu {
  height: 100%;
}

.avatr-warp{
    display: flex;
    align-items: center;
    .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
    }
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
//   background-color: #b3c0d1;
}
</style>
