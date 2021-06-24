<template>
  <div class="login-container">
    <el-form :model="user" ref="ruleForm" class="login-from">
      <el-form-item prop="mobile">
        <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="checked"
          >我已阅读并同意用户协议和隐私条款</el-checkbox
        >
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="primary" @click="onLogin" :loading="loginLoading"
          >登陆</el-button
        >
      </el-form-item>
    </el-form>
    <router-view />
  </div>
</template>
<script>
import requset from '@/utils/request'

export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      },
      checked: false, // 多选款状态
      loginLoading: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onLogin () {
      // 获取 表单数据 表单验证  验证通过提交登陆 处理结果
      this.loginLoading = true
      const user = this.user

      requset({
        method: 'POST',
        url: '/mp/v1_0/authorizations',
        data: user
      }).then(res => {
        console.log(res)
        this.$message({
          message: '登陆成功',
          type: 'success'
        })
        this.loginLoading = false
      }).catch(err => {
        console.log(err)
        this.$message.error('登陆失败,手机号或验证码错误')
        this.loginLoading = false
      })
    }
  }
}
</script>

<style lang="less">
.login-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("./login_bg.jpg") no-repeat;
  background-size: cover;
}

.login-from {
  background-color: #fff;
  padding: 50px;
  min-width: 300px;
  .login-btn {
    width: 100%;
  }
}
</style>
