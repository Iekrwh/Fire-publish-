<template>
  <div class="login-container">
       <!-- rules定义表单验证 -->
    <el-form :model="user" ref="loginForm" class="login-from" :rules="formRules">
      <el-form-item prop="mobile">
        <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
      </el-form-item>
      <el-form-item prop='agree'>
        <el-checkbox v-model="user.agree"
          >我已阅读并同意用户协议和隐私条款</el-checkbox
        >
      </el-form-item>
      <el-form-item >
        <el-button class="login-btn" type="primary" @click="onLogin" :loading="loginLoading"
          >登陆</el-button
        >
      </el-form-item>
    </el-form>
    <router-view />
  </div>
</template>
<script>
import { login } from '@/api/user'

export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '', // 验证码
        agree: false // 是否同意协议
      },
      //   checked: false, // 多选款状态
      loginLoading: false,
      formRules: { // 表单验证规则配置
      // required 不能为空   message验证不通过提示  trigger:blur为失去焦点时验证  change为更改后验证
      // pattern 正则表达  range 使用min max 定义范围    len 要验证字段的长度  enum 枚举
        mobile: [{ required: true, message: '手机号不能为空', trigger: 'change' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的号码格式', trigger: 'change' }
        ],
        code: [{ required: true, message: '验证码不能为空', trigger: 'change' },
          { min: 6, max: 6, message: '请输入正确的验证码格式', trigger: 'blur' }
        ],
        agree: [{
          validator: (rule, value, callback) => {
          // 定义验证规则  rule为表单的详细信息  value为布尔
          // 验证通过: callback()   验证失败:callback(new Error('自定义错误消息提示'))
            // console.log(value)
            if (value) {
              callback()
            } else {
              callback(new Error('请同意用户协议'))
            }
          },
          trigger: 'change'
        }]
      }

    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onLogin () {
      this.$refs.loginForm.validate((valid, err) => {
        // 返回两个参数  valid 一个布尔值是否通过验证   err 验证的具体配置
        // 所以我们可以通过返回的布尔值来判断表单是否通过验证
        if (!valid) {
          // 不通过返回
          return
        }
        // 通过调用api接口验证用户信息
        this.login()
      })
    },
    login () {
      // 获取 表单数据 表单验证  验证通过提交登陆 处理结果
      this.loginLoading = true

      login(this.user).then(res => {
        // console.log(res)
        this.$message({
          message: '登陆成功',
          type: 'success'
        })
        // 关闭 登录按钮的loading
        this.loginLoading = false
        // 登录成功跳转到首页   如果路由中没有指定name则需要加上地址后缀 非常冗余
        this.$router.push({
          name: 'home'
        })

        // eslint-disable-next-line handle-callback-err
      }).catch(err => {
        this.$message.error('登陆失败,手机号或验证码错误')
        // console.log(err)
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
