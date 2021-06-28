<template>
  <div class="publish-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{
            $route.query.id ? "修改文章" : "发布文章"
          }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form ref="publish-form" :model="article" label-width="60px" :rules='formRules'>
        <el-form-item label="标题" prop="title">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <!-- <el-input type="textarea" v-model="article.content"></el-input> -->
          <el-tiptap
            v-model="article.content"
            :extensions="extensions"
            placeholder="请输入文章内容"
            height="400"
            lang="zh"
          ></el-tiptap>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type" >
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- 在temlate中判断 不会产生根节点 -->
         <template v-if='article.cover.type > 0'>
             <!-- 如果想要在事件处理自定义传参以后还想保留原来(传参以后会覆盖原来的参数)的那个事件的参数 在参数前加上$event,它就代表那个事件原本的参数 -->
             <!-- 当你给子组件的数据提供的数组 即想修改又要使用 我们可以使用v-model 简化  它实现了 :value='article.cover.images[index]  和 @input='article.cover.images[index] = 事件参数''
                v-mode只是简化了而已,本质上还是在父子组件通信
              -->
              <!-- <upload-cover v-for="(cover,index) in article.cover.type"  :key='cover' @update-cover='onUpdateCover(index,$event)' :cover-image="article.cover.images[index]"/> -->
              <upload-cover v-for="(cover,index) in article.cover.type"  :key='cover' v-model="article.cover.images[index]" />
         </template>
        </el-form-item>
        <el-form-item label="频道" prop="channel_id">
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
          <el-button @click="onPublis(true)">存为草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getArticlesChannels, addArticle, getArticle, updateArticle } from '@/api/article'
import { uploadImage } from '@/api/image'
import {
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Image,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  TodoItem,
  TodoList,
  HorizontalRule,
  Fullscreen,
  Preview,
  CodeBlock,
  TextColor
} from 'element-tiptap'
import 'element-tiptap/lib/index.css'
import UploadCover from './components/upload-cover.vue'

export default {
  name: 'PublishIndex',
  components: {
    'el-tiptap': ElementTiptap,
    UploadCover
  },
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
      },
      // 编辑器的 extensions
      // 它们将会按照你声明的顺序被添加到菜单栏和气泡菜单中
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Image({
          // 默认会把图片上传base64形式字符串与内容存储在一起,需要自定义图片上传
          uploadRequest (file) {
            console.log(file) // image中返回的file对象 里面存储了图片的具体
            const fd = new FormData() // new一个formdata 因为要把请求头中的 Content-Type 设置为 multipart/form-data 我们直接new一个formdata就好了
            fd.append('image', file) // 把image对象添加进去
            return uploadImage(fd).then(res => { // 这个函数返回的是url 所以我们直接返回这个函数就好了
              console.log(res) // 调用上传接口
              return res.data.data.url // 返回数据 里面存储了本地url
            })
          }
        }),
        new Underline(), // 下划线
        new Italic(), // 斜体
        new Strike(), // 删除线
        new HorizontalRule(), // 华丽的分割线
        new ListItem(),
        new BulletList(), // 无序列表
        new OrderedList(), // 有序列表
        new TodoItem(),
        new TodoList(),
        new Fullscreen(),
        new Preview(),
        new CodeBlock(),
        new TextColor()
      ],
      formRules: {
        title: [{ required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 5, max: 30, message: '标题长度 在 3 到 30 个字符范围', trigger: 'blur' }],
        content: [
          { required: true, message: '请输入内容', trigger: 'change' },
          {
            validator (rule, value, callback) {
              if (value === '<p></p>') {
                callback(new Error('请输入文章内容'))
              } else {
                callback()
              }
            }
          }
        ],
        channel_id: [{ required: true, message: '请选择发布的频道', trigger: 'blur' }]
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    loadChannels () { // 加载频道
      getArticlesChannels().then(res => {
        this.channels = res.data.data.channels
        // console.log(res)
      })
    },
    onPublis (draft = false) { // 发表按钮绑定方法
      this.$refs['publish-form'].validate(valid => { // 验证富文本 内容
        console.log('form')
        if (!valid) {
          return
        }

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
            this.$router.push('/article')
          })
        }
      })
    },
    loadArticle () { // 获取文章内容
      getArticle(this.$route.query.id).then(res => {
        // console.log(res)
        this.article = res.data.data
      })
    },
    onUpdateCover (index, url) {
    //   console.log(index, url)
      this.article.cover.images[index] = url // 数组前面的元素未定义时可以直接在指定索引插入元素,前面为空的元素自动填充undefined
    }
  },
  created () {
    this.loadChannels()

    // 判断是发布还是修改 如路由请求路径参数中有id,则请求展示文章内容
    if (this.$route.query.id) {
      this.loadArticle()
    }
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
