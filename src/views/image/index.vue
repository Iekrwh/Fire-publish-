<template>
  <div class="image-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="action-head">
        <el-radio-group v-model="collect" @change="onCollectChange">
          <el-radio-button label="false">全部</el-radio-button>
          <el-radio-button label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button type="success" @click="dialogUploadVisible = true">上传图片素材</el-button>
      </div>
      <el-row :gutter="10">
        <el-col
          :xs="12"
          :md="6"
          :lg="4"
          :sm="6"
          v-for="(img, index) in images"
          :key="index"
        >
          <el-image style="height: 100px" :src="img.url" fit="cover"></el-image
        ></el-col>
      </el-row>
    </el-card>
<!-- :append-to-body 对话框浮body浮于遮蔽层之上 -->
    <el-dialog title="上传图片素材"
    :visible.sync="dialogUploadVisible"
    :append-to-body='true'

    >
    <!-- upload组件支持上传,默认请求方法是POST请求  action请求地址  headers请求头-->
    <el-upload
  class="upload-demo"
  drag
  action="http://api-toutiao-web.itheima.net/mp/v1_0/user/images"
  :headers='uploadHeaders'
  name='image'
  :on-success="onUploadSucces"
  multiple>
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
</el-dialog>
  </div>
</template>

<script>
import { getImages } from '@/api/image'

export default {
  name: 'ImageIndex',
  components: {},
  data () {
    const user = JSON.parse(window.localStorage.getItem('user'))
    return {
      collect: false,
      images: [], // 素材图片列表
      dialogUploadVisible: false, // 收藏按钮和全部按钮请求的传参
      uploadHeaders: { Authorization: `Bearer ${user.token}` }
    }
  },
  computed: {},
  watch: {},
  methods: {
    loadImages (collect) {
      getImages(
        { collect }
      ).then(res => {
        // console.log(res)
        this.images = res.data.data.results
      })
    },
    onCollectChange (value) {
      //   console.log(value)  //当单选框发生改变时的值
      this.loadImages(value)
    },
    onUploadSucces () { // 上传成功后 上传组件触发的方法
      this.dialogUploadVisible = false // 关闭遮蔽层和上传组件

      this.loadImages(false) // 重新查询全部图片素材
    }
  },
  created () {
    this.loadImages(false)
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
.action-head {
    padding-bottom:20px;
    display:flex;
    justify-content: space-between;
}
</style>
