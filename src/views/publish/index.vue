<template>
    <div class="publish-container">
        <el-card class="box-card">
  <div slot="header" class="clearfix">
    <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>{{$route.query.id ? '修改文章' : '发布文章'}}</el-breadcrumb-item>
</el-breadcrumb>
  </div>
<el-form ref="form" :model="form" label-width="60px">
  <el-form-item label="标题">
    <el-input v-model="article.title"></el-input>
  </el-form-item>
   <el-form-item label="内容">
    <el-input type="textarea" v-model="article.content"></el-input>
  </el-form-item>
   <el-form-item label="封面">
    <el-radio-group v-model="article.cover.type">
      <el-radio :label="1">单图</el-radio>
      <el-radio :label="3">三图</el-radio>
      <el-radio :label="0">无图</el-radio>
      <el-radio :label="-1">自动</el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="频道">
    <el-select v-model="article.channel_id" placeholder="请选择频道">
            <el-option
              :label="channle.name"
              :value="channle.id"
              v-for="(channle, index) in channels"
              :key="index"
            ></el-option>
    </el-select>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="onPublis()">发布</el-button>
    <el-button @click="onPublis(true)" >存为草稿</el-button>
  </el-form-item>
</el-form>
</el-card>
    </div>
</template>

<script>
import { getArticlesChannels, addArticle, getArticle, updateArticle } from '@/api/article'

export default {
  name: 'PublishIndex',
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
      channels: [], // 频道
      article: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {
          type: 0, // 封面类型  -1自动 0无图 1一张 3三张
          images: [] // 图片地址
        }, // 文章封面
        channel_id: null
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    loadChannels () {
      getArticlesChannels().then(res => {
        this.channels = res.data.data.channels
        // console.log(res)
      })
    },
    onPublis (draft = false) { // 发表按钮绑定方法
      const articleID = this.$route.query.id
      if (articleID) { // 判断是否为编辑内容
        updateArticle(articleID, this.article, draft).then(res => {
          console.log(res)
          this.$message({
            message: `${draft ? '存入草稿' : '修改'}成功`,
            type: 'success'
          })
          this.$router.push('/article')
        })
      } else { // 为空则为新发布
        addArticle(this.article, draft).then(res => {
        // console.log(res)
          this.$message({
            message: `${draft ? '存入草稿' : '发布'}成功`,
            type: 'success'
          })
        })
      }
    },
    loadArticle () {
      getArticle(this.$route.query.id).then(res => {
        console.log(res)
        this.article = res.data.data
      })
    }
  },
  created () {
    this.loadChannels()

    // 判断是发布还是修改 如路由请求路径参数中有id,则请求展示文章内容
    if (this.$route.query.id) {
      this.loadArticle()
    }
  },
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

</style>
