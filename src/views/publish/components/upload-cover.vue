<template>
    <div class="upload-cover" @click="showCoverSelect">
        <div class="cover-wrap">
<img ref="cover-image" :src="value"  class="cover-imag">
        </div>
        <el-dialog
  title="选择封面"
  :visible.sync="dialogVisible"
  append-to-body
  >
   <el-tabs v-model="activeName" type="card" >
    <el-tab-pane label="素材库" name="first"><img-list :is-show-add='false' :is-show-action='false' :is-selected='true'
    ref="image-list"
    /></el-tab-pane>
    <el-tab-pane label="上传图片" name="second">
        <input type="file" ref="file" @change="onFileChange">
        <img  ref="preview-image" width='100'>
    </el-tab-pane>

  </el-tabs>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="onCoverConfirm">确 定</el-button>
  </span>
</el-dialog>
    </div>
</template>

<script>
import { uploadImage } from '@/api/image'
import ImgList from '@/views/image/components/img-list.vue'

export default {
  name: 'UploadCover',
  components: { ImgList },
  data () {
    return {
      dialogVisible: false,
      activeName: 'first'
    }
  },
  computed: {},
  watch: {},
  methods: {
    showCoverSelect () {
      this.dialogVisible = true
    },
    onFileChange () {
    //   this.$refs.file.values = '' // 清空上传文件名

      const file = this.$refs.file.files[0]

      const blob = window.URL.createObjectURL(file) // 文件预览

      this.$refs['preview-image'].src = blob
    },
    onCoverConfirm () {
      // 判断是上传图片标签并且有文件

      if (this.activeName === 'second') {
        const file = this.$refs.file.files[0]

        if (!this.$refs.file.files[0]) {
          this.$message('请选择文件')
          return
        }
        // 上传文件
        const fd = new FormData()
        fd.append('image', file)
        uploadImage(fd).then(res => {
          this.$refs['cover-image'].src = res.data.data.url

          // 上传完 关闭遮蔽层
          this.dialogVisible = false
          //   console.log(res.data.data.url)
          // 将图片地址 发个给父组件
          //   this.$emit('update-cover', res.data.data.url)
          this.$emit('input', res.data.data.url)
        })
      } else if (this.activeName === 'first') {
        // 父组件可以直接访问子组件中数据
        const imageList = this.$refs['image-list']
        const selected = imageList.selected
        if (!selected) {
          this.$$message('请选择封面图片')
          return
        }
        // 关闭遮罩层
        this.dialogVisible = false
        // 将图片地址 发个给父组件
        // console.log(imageList.images)
        this.$emit('input', imageList.images[selected].url)
      }
    }
  },
  props:
//    ['cover-image'],
['value'],
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
.cover-wrap {
    width: 150px;
    height: 120px;
    border: 1px solid #000;
    .cover-imag {
        height: 120px;
        max-width: 100%;
    }
}
</style>
