<template>
  <div class="article-container">
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <!-- 数据筛选表单 -->
      <el-form ref="form" :model="form" label-width="50px">
        <el-form-item label="状态">
          <!-- 表单绑定status -->
          <el-radio-group v-model="status">
            <!-- el-radio 默认把label作为文本和选中之后的value值 -->
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="channelID" placeholder="请选择">
            <el-option label="全部" :value="null"></el-option>
            <el-option
              :label="channle.name"
              :value="channle.id"
              v-for="(channle, index) in channels"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
            <!-- format是选择时的格式化  value-format是返回时格式化 -->
          <el-date-picker
            v-model="rangeDate"
            type="datetimerange"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item>
          <!-- button 按钮的click事件会有默认参数,当没有指定参数时,它会默认传一个没有用的数据 -->
          <el-button type="primary" @click="loadArticles(1)">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>根据筛选共查询到 {{ totalCount }} 条结果：</span>
      </div>
      <!-- 数据列表 -->
      <el-table   v-loading="loading" class="list-table" :data="articles" stripe style="width: 100%">
        <el-table-column prop="pubdate" label="封面"
          ><template slot-scope="scope">
            <el-image
              lazy
              :src="scope.row.cover.images[0]"
              style="width: 100px; height: 100px"
              fit="cover"
            >
            <!-- 懒加载 加上lazy属性  如果用户没有浏览到该区域默认不加载   -->
              <div slot="error" class="image-slot">
                  <img src="./no-cover.png" class="article-cover"
                />
              </div>
            </el-image>
            <!-- <img :src="scope.row.cover.images[0]" alt=""  class="article-cover" v-if="scope.row.cover.images[0]"
          />
          <img src="./no-cover.png" class="article-cover" v-else alt=""> -->
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"> </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <!-- 如果需要自定义模板中获取当前遍历数据,那么在 template 声明 slot-scope="scope" scope可以自定义名称-->
            <!-- scope$index 当前遍历项索引   scope.row当前遍历对象数据 -->
            <el-tag
              effect="dark"
              :type="articleStatus[scope.row.status].type"
              >{{ articleStatus[scope.row.status].text }}</el-tag
            >
            <!-- <el-tag v-else-if="scope.row.status === 1" effect="dark"
              >待审核</el-tag
            >
            <el-tag
              v-else-if="scope.row.status === 2"
              type="success"
              effect="dark"
              >审核通过</el-tag
            >
            <el-tag
              v-else-if="scope.row.status === 3"
              type="warning"
              effect="dark"
              >审核失败</el-tag
            >
            <el-tag
              v-else-if="scope.row.status === 4"
              type="danger"
              effect="dark"
              >已删除</el-tag
            > -->
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"> </el-table-column>
        <!-- 表格列默认只能渲染普通文本,如需要展示图片、按钮就需要自定义表格列模板 -->
        <el-table-column label="操作">
          <template slot-scope='scope' >
            <el-button circle icon="el-icon-edit" ></el-button>
            <el-button type="danger" circle icon="el-icon-delete" @click="onDeletArticle(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page.sync="page"
        :total="totalCount"
        :page-size="perSize"
        :disabled='loading'
        @current-change="onCurrentChange"
      >
      </el-pagination>
    </el-card>

    <!-- 列表分页 -->
  </div>
</template>

<script>
import { getArticles, getArticlesChannels, DeleteArticle } from '@/api/article'

export default {
  name: 'ArticleIndex',
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

      // 文章列表内容
      articles: [],
      articleStatus: [
        { type: '', satatus: 0, text: '草稿' },
        { type: 'warning', satatus: 1, text: '待审核' },
        { type: 'success', satatus: 2, text: '审核通过' },
        { type: 'info', satatus: 3, text: '审核失败' },
        { type: 'danger', satatus: 4, text: '已删除' }],
      totalCount: 0, // 总数据条数
      perSize: 10, // 每页显示数量
      status: null, // 筛选文章状态 不传为全部
      channels: [], // 文章频道 列表
      channelID: null, // 查询文章的频道
      rangeDate: null, // 筛选日期
      loading: true, // 表格加载
      page: 1 // 当前页
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 默认值 省参
    loadArticles (page = 1) {
      this.loading = true // 请求开始加载中
      getArticles({
        status: this.status, // 筛选文章状态 不传为全部
        page, // 第几页
        per_page: this.perSize, // 每页多少列
        channel_id: this.channelID, // 文章频道
        begin_pubdate: this.rangeDate ? this.rangeDate[0] : null, // 开始日期
        end_pubdate: this.rangeDate ? this.rangeDate[1] : null // 结束日期
      }).then(res => {
        // console.log(res)
        // total_count : totalCount 为变量重命名 因为指定要驼峰命名法
        // const {} =res.data.data  自动匹配该对象里的对应的值
        const { results, total_count: totalCount } = res.data.data
        this.articles = results
        this.totalCount = totalCount

        this.loading = false // 列表加载完毕
      })
    },

    onCurrentChange (page) {
      //   console.log(page) // 当前页面
      // 调用接口 传参
      this.loadArticles(page)
    },

    loadChannels () {
      getArticlesChannels().then(res => {
        // console.log(res)
        this.channels = res.data.data.channels
      })
    },
    // 我们接口返回的文章数据id 是json字符串 axios默认将json字符串转成js对象来方便使用,但是转了之后 id超出了js中的int范围值发生了改变
    // 我们可以使用json-bigint一个包来解决这个问题   json-bigint.parse 将json字符串转为json-bigint类型(我们在axios配置中已经修改了配置)  所以我们在这里直接tosting就可以使用
    onDeletArticle (articleID) {
      console.log(articleID)
      console.log(articleID.toString())
      this.$confirm('确认删除?', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        DeleteArticle(articleID.toString()).then(res => {
          console.log(res)
        })
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        // 删除后更新当前页 重新查询文章列表
        this.loadArticles(this.page)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    onSubmit () {
      console.log('submit!')
    }
  },
  // 生命周期
  created () {
    this.loadArticles(1)
    this.loadChannels()
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
.filter-card {
  margin-bottom: 30px;
}

.list-table {
  margin-bottom: 20px;
}

.article-cover {
  width: 100px;
  background-size: cover;
}
</style>
