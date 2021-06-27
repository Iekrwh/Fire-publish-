<template>
  <div class="setting-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人设置</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row>
        <el-col :span="16">
          <el-form ref="form" :model="user" label-width="80px">
            <el-form-item label="编号">  <el-input v-model="user.id" disabled></el-input> </el-form-item>
            <el-form-item label="手机">  <el-input v-model="user.mobile" disabled></el-input> </el-form-item>
            <el-form-item label="活动名称">
              <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍">
              <el-input v-model="user.intro"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input type="textarea" v-model="user.email"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="onSubmit">保存</el-button>
            </el-form-item>
          </el-form></el-col
        >
        <el-col :offset="2" :span="4">

          <!-- 绑定按钮并模拟点击 -->
          <!-- <p @click='$refs.file.click()'>点击修改头像</p> -->  <!-- 用vue的方式绑定-->
          <!-- 用h5自己带的label实现 -->
          <p><label for="file">
              <el-avatar
            shape="square"
            :size="150"
            fit="fit"
            :src="user.photo"
          ></el-avatar>
              <p>点击修改头像</p></label>
          <input id='file' type="file" hidden ref='file' @change="onFileChange"></p>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  append-to-body
  :before-close="handleClose">
 <img width="200" :src="previewImage" alt="">
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>

  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'

export default {
  name: 'SettingIndex',
  components: {},
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      user: {
        email: '',
        id: null,
        intro: '',
        mobile: '',
        name: '',
        photo: ''
      }, // 用户资料
      dialogVisible: false, // 控制遮罩层和对话框
      previewImage: '' // 预览图片
    }
  },
  computed: {},
  watch: {},
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    loadUser () {
      getUserProfile().then(res => {
        console.log(res)
        this.user = res.data.data
      })
    },
    onFileChange () {
    //   console.log('file')
      const file = this.$refs.file // 获取文件对象
      //  console.log(file.files[0]) // 默认存储在file.files[0]中
      const blobData = window.URL.createObjectURL(file.files[0]) // 获取 图片地址
      //   console.log(blobData)

      this.previewImage = blobData // 绑定vue中data

      this.dialogVisible = true // 遮罩层弹出

      this.$refs.file.value = '' // 因为input file 是文件名发生改变而触发的相同名字不触发事件所以我们触发之后更改为空
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  },
  created () {
    this.loadUser()
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
</style>
