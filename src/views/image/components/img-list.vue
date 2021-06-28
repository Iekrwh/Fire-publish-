<template>
  <div class="image-list">
    <div class="action-head">
      <el-radio-group v-model="collect" @change="loadImages(1)">
        <el-radio-button label="false">全部</el-radio-button>
        <el-radio-button label="true">收藏</el-radio-button>
      </el-radio-group>
      <el-button
        type="success"
        @click="dialogUploadVisible = true"
        v-if="isShowAdd"
        >上传图片素材</el-button
      >
    </div>
    <el-row :gutter="10">
      <el-col
        class="img-col"
        :xs="12"
        :md="6"
        :lg="4"
        :sm="6"
        v-for="(img, index) in images"
        :key="index"
        @click.native="selected = index"
      >
        <el-image style="height: 150px"   :src="img.url" fit="fill"> </el-image>
        <div class="selected" v-if='selected === index && isSelected' ></div>
        <div class="btn" v-if="isShowAction">
          <i
            :class="{
              'el-icon-star-on': img.is_collected,
              'el-icon-star-off': !img.is_collected,
            }"
            @click="onCollect(img)"
          ></i>
          <i class="el-icon-delete" @click="onDelete(img)"></i>
        </div>
      </el-col>
    </el-row>
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="onPageChange"
      :page-size="pageSize"
      :current-page.sync="page"
      :total="totalCount"
    >
    </el-pagination>
    <el-dialog
      title="上传图片素材"
      :visible.sync="dialogUploadVisible"
      :append-to-body="true"
    >
      <!-- upload组件支持上传,默认请求方法是POST请求  action请求地址  headers请求头-->
      <el-upload
        class="upload-demo"
        drag
        action="http://api-toutiao-web.itheima.net/mp/v1_0/user/images"
        :headers="uploadHeaders"
        name="image"
        :on-success="onUploadSucces"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import { getImages, collectImages, deleteImages } from '@/api/image'

export default {
  name: 'ImageIndex',
  components: {},
  data () {
    const user = JSON.parse(window.localStorage.getItem('user'))
    return {
      collect: false,
      images: [], // 素材图片列表
      dialogUploadVisible: false, // 收藏按钮和全部按钮请求的传参
      uploadHeaders: { Authorization: `Bearer ${user.token}` },
      totalCount: 0,
      pageSize: 20,
      page: 1,
      selected: null // 选中的索引
    }
  },
  // 使用数组prop 不建议  使用对象prop 比较常用可以定义多个验证需求
  props: {
    isShowAdd: { // 控制显示上传素材按钮
      type: Boolean,
      default: true
    },
    isShowAction: { // 控制显示收藏和删除操作
      type: Boolean,
      default: true
    },
    isSelected: {
      type: Boolean,
      default: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    loadImages (page = 1) {
      //   console.log('加载')
      this.page = page // 重置高亮页码
      getImages(
        {
          collect: this.collect,
          page,
          per_page: this.pageSize
        }
      ).then(res => {
        // console.log(res)
        // console.log('成功加载')
        // const results = res.data.data.results
        // results.forEach(img => { // 给results 即图片列表 每个元素添加一个单独的loading状态
        //   img.loading = false
        // })

        this.images = res.data.data.results
        this.totalCount = res.data.data.total_count
      })
    },
    onCollectChange () {
      //   console.log(value)  //当单选框发生改变时的值
      this.loadImages()
    },
    onUploadSucces () { // 上传成功后 上传组件触发的方法
      this.dialogUploadVisible = false // 关闭遮蔽层和上传组件

      this.loadImages(this.page) // 重新查询当前图片素材

      this.$message({
        type: 'success',
        message: '上传成功'
      })
    },
    onDelete (img) { // 删除操作
      console.log(img)
      deleteImages(img.id).then(res => { // 删除接口
        // this.loadImages(this.page)
        console.log('重载')
        this.loadImages(this.page) // 删除之后重新获取列表不知道为什么会失败 方法体都没有传,loadimages没问题
      })
    },
    onPageChange (page) { // 当页码发生改变的页码数
      this.loadImages(page)
    },
    onCollect (img) {
      //   console.log(img.loading)
      //   if (img.loading) { // 懒得写样式了 直接拒绝请求,等请求结束后解锁  还是有问题
      //     return
      //   }

      //   img.loading = true // 该图片的loading 状态开启
      //   console.log(img.loading)

      // 监听收藏按钮 取消和添加收藏
      collectImages(img.id, !img.is_collected).then(res => {
        // console.log(res)
        img.is_collected = !img.is_collected
      })

      //   img.loading = false // 请求完毕 关闭
    }

  },
  created () {
    this.loadImages(1)
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
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
}

.img-col {
  position: relative;

  .btn {
    background-color: rgba(204, 204, 204, 0.4);
    height: 40px;
    position: absolute;
    display: flex;
    bottom: 4px;
    left: 5px;
    right: 5px;
    font-size: 25px;
    justify-content: space-evenly;
    align-items: center;
  }
}

.selected {
  background: url(./selected.png) no-repeat;
  background-size: cover;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
