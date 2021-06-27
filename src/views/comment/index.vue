<template>
  <div class="comment-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>评论管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-table class="table-list" :data="articles" style="width: 100%" stripe >
        <el-table-column prop="title" label="标题">
        </el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数">
        </el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数"> </el-table-column>
        <el-table-column prop="comment_status" label="评论状态"> <template slot-scope="scope">
            {{scope.row.comment_status ? '正常' : '关闭 '}}
            </template> </el-table-column>
        <el-table-column prop="address" label="操作"><template slot-scope="scope">
            <el-switch
  v-model="scope.row.comment_status"
  active-color="#13ce66"
  :disabled='scope.row.statusDisabled'
  @change='onStatusChange(scope.row)'
>
</el-switch></template> </el-table-column>
      </el-table>
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="page"
      :page-sizes="[10, 20, 50, 100]"
      :page-size.sync="padeSize"
      layout="total, sizes, prev, pager, next, jumper"
      background
      :total="totalCount">
    </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getArticles, updateCommentStatus } from '@/api/article'

export default {
  name: 'commentIndex',
  components: {},
  data () {
    return {

      articles: [], // 评论的详细内容
      totalCount: 0,
      padeSize: 10,
      page: 1 // 当前页码
    }
  },
  computed: {},
  watch: {},
  methods: {
    handleSizeChange () { // 每页数量改变时
      this.loadArticles(1) // 改变从重新获取数据 并在第一页展示
    },
    handleCurrentChange (page) {
      this.loadArticles(page) // 页码改变 跳转页码
    },
    loadArticles (page = 1) {
      this.page = page
      getArticles({
        response_type: 'comment',
        page,
        per_page: this.padeSize
      }).then(res => {
        // console.log(res)
        const { results } = res.data.data
        results.forEach(article => {
          article.statusDisabled = false // 添加loading 按钮状态
        })
        this.articles = results
        this.totalCount = res.data.data.total_count
      })
    },
    onStatusChange (article) {
      article.statusDisabled = true // loading 开启
      // 接口修改评论状态
      updateCommentStatus(article.id.toString(), article.comment_status).then(res => {
        article.statusDisabled = false // loading 关闭
        this.$message({
          type: article.comment_status ? 'success' : 'error',
          message: article.comment_status ? '开启文章评论' : '关闭文章评论'
        })
      })
    }
  },
  created () {
    this.loadArticles()
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
.table-list{
    margin-bottom: 30px;
}
</style>
