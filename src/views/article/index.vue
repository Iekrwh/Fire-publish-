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
          <el-radio-group v-model="form.resource">
            <el-radio label="全部"></el-radio>
            <el-radio label="草稿"></el-radio>
            <el-radio label="待审核"></el-radio>
            <el-radio label="审核通过"></el-radio>
            <el-radio label="审核失败"></el-radio>
            <el-radio label="已删除"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="form.date1"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>根据筛选共查询到 4200 条结果：</span>
      </div>
      <!-- 数据列表 -->
      <el-table class="list-table" :data="articles" stripe style="width: 100%">
        <el-table-column prop="pubdate" label="封面"> </el-table-column>
        <el-table-column prop="title" label="标题"> </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <!-- 如果需要自定义模板中获取当前遍历数据,那么在 template 声明 slot-scope="scope" -->
            <!-- scope$index 当前遍历项索引   scope.row当前遍历对象数据 -->
            <el-tag v-if="scope.row.status === 0" type="info" effect="dark">草稿</el-tag>
            <el-tag v-else-if="scope.row.status === 1" effect="dark"
              >待审核</el-tag
            >
            <el-tag v-else-if="scope.row.status === 2"  type="success" effect="dark"
              >审核通过</el-tag
            >
            <el-tag v-else-if="scope.row.status === 3"  type="warning" effect="dark"
              >审核失败</el-tag
            >
            <el-tag v-else-if="scope.row.status === 4" type="danger" effect="dark"
              >已删除</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"> </el-table-column>
        <!-- 表格列默认只能渲染普通文本,如需要展示图片、按钮就需要自定义表格列模板 -->
        <el-table-column label="操作">
          <template>
            <el-button circle icon="el-icon-edit"></el-button>
            <el-button type="danger" circle icon="el-icon-delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next" :total="1000">
      </el-pagination>
    </el-card>

    <!-- 列表分页 -->
  </div>
</template>

<script>
import { getArticles } from '@/api/article'

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
      articles: []
    }
  },
  computed: {},
  watch: {},
  methods: {
    loadArticles () {
      getArticles().then(res => {
        console.log(res)
        this.articles = res.data.data.results
      })
    },

    onSubmit () {
      console.log('submit!')
    }
  },
  // 生命周期
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
.filter-card {
  margin-bottom: 30px;
}

.list-table {
  margin-bottom: 20px;
}
</style>
