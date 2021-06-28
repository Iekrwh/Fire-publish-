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
          <el-form ref="form" :model="user" label-width="80px" :rules='rules'>
            <el-form-item label="编号">  <el-input v-model="user.id" disabled></el-input> </el-form-item>
            <el-form-item label="手机">  <el-input v-model="user.mobile" disabled></el-input> </el-form-item>
            <el-form-item label="活动名称" prop="name">
              <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍" prop="intro">
              <el-input v-model="user.intro"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input type="textarea" v-model="user.email"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="onUpdataUser" :loading='updateUser'>保存</el-button>
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
  title="修改头像"
  :visible.sync="dialogVisible"
  width="30%"
  append-to-body
  @opened='onDialogOpened'
  :before-close="handleClose">
  <div class="preview-image-wrap">
      <img
       ref='preview-image'
      calss='preview-image'
  :src="previewImage"
  >
  </div>
 <!-- <img width="200" :src="previewImage" alt=""> -->
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button :loading='updatePhotoLoding' type="primary" @click="onUpdatePhoto">确 定</el-button>
  </span>
</el-dialog>

  </div>
</template>

<script>
import { getUserProfile, updateUserPhoto, updateUser } from '@/api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import globalBus from '@/utils/global-bus'

export default {
  name: 'SettingIndex',
  components: {},
  data () {
    return {
      user: {
        email: '',
        id: null,
        intro: '',
        mobile: '',
        name: '',
        photo: ''
      }, // 用户资料
      dialogVisible: false, // 控制遮罩层和对话框
      previewImage: '', // 预览图片
      cropper: null, // 裁切器实例
      updatePhotoLoding: false, // 头像 loading状态
      updateUser: false, // 登陆 loading状态
      rules: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }, { min: 1, max: 7, message: '请输入 1 到 7 个字符', trigger: 'change' }],
        intro: [{ required: true, message: '请输入媒体介绍', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' },
          { pattern: /.*@.*.com$/, message: '请输入正确的邮箱', trigger: 'blur' }
        ]

      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    onUpdataUser () {
      this.updateUser = true
      const { name, intro, email } = this.user
      updateUser({
        name,
        intro,
        email
      }).then(res => {
        this.$message({
          type: 'success',
          message: '修改资料成功'
        })

        // 发布通知告诉顶部导航组件 请求调用
        globalBus.$emit('update-user', this.user)

        this.updateUser = false
      })
    },
    loadUser () {
      getUserProfile().then(res => {
        // console.log(res)
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
    onDialogOpened () { // 遮罩层动画结束后
      const image = this.$refs['preview-image']
      // 使用vue中的ref 操控dom容器
      // 图片裁切必须要在img可见状态才能正常完成初始化,所以我们在遮罩层动画结束后初始化裁切器
      // 第一次初始化后,如果预览图片发生变化,裁切器默认不会更新
      // 1.使用.replace方法重置  2.使用.destroy销毁裁切器
      if (this.cropper) {
        this.cropper.replace(this.previewImage) // 重置
        return // 返回
      }
      this.cropper = new Cropper(image, {
        aspectRatio: 1, // 裁切器裁切初始化比例 16/9 1/1
        viewMode: 1, // 0为不限制  1为限制到图片大小  是否允许选择框移动到图片外
        dragMode: 'none', // 图片移动方式
        cropBoxResizable: false, // 不允许用户改变裁切选择框大小
        crop (event) { // 当移动裁切器会触发crop方法
        //   console.log(event.detail.x)
        //   console.log(event.detail.y)
        //   console.log(event.detail.width)
        //   console.log(event.detail.height)
        //   console.log(event.detail.rotate)
        //   console.log(event.detail.scaleX)
        //   console.log(event.detail.scaleY)
        }
      })
    },
    onUpdatePhoto () { // 修改头像确认按钮
      this.updatePhotoLoding = true
      // 获取裁切后的图片
      this.cropper.getCroppedCanvas().toBlob(blob => {
        // console.log(blob)
        const fd = new FormData()
        fd.append('photo', blob)
        updateUserPhoto(fd).then(res => { // 请求接口上传裁切后的图片对象
        //   console.log(res)
          this.dialogVisible = false // 关闭遮蔽层

          //   this.user.photo = res.data.data.photo // 更新头像绑定地址

          this.user.photo = window.URL.createObjectURL(blob) // 更新头像绑定地址

          // 发布通知告诉顶部导航组件 请求调用
          globalBus.$emit('update-user', this.user)

          this.updatePhotoLoding = false

          this.$message({
            type: 'success',
            message: '修改头像成功'
          })
        })
      })
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
.preview-image-wrap {
    .preview-image {
        display: block;
        max-width: 100%;
        height: 200px;
    }
}
</style>
