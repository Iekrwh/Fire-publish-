import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/'
import Home from '@/views/home/'
import Layout from '@/views/layout/'
import Article from '@/views/article'
import Publish from '@/views/publish'
import Image from '@/views/image'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    // 命名路由 layout 有一个默认子路由，这个名字没有意义，所以警告
    // 正确的做法是：如果有默认子路由，就不要给父路由起名字了
    // name: 'layout',
    component: Layout,
    children: [
      {
        // 我们通常会把根路径 / 设置为网站的首页
        // 为啥呢？因为我们在手动输入网址访问网站的时候，可以省略 /
        // 如果你是别的名称，则必须加上
        path: '', // path 为空，会作为默认子路由渲染

        // 路由的名字为 方便调用 不用每次都输后缀 语意性强一点
        name: 'home',
        component: Home
      }, {
        path: '/article',
        name: 'article',
        component: Article
      }, {
        path: '/publish',
        name: 'publish',
        component: Publish
      }, {
        path: '/image',
        name: 'image',
        component: Image
      }

    ]
  }
]

const router = new VueRouter({
  routes
})

// 路由导航守卫 所有的页面导航都会经过这里
// to:要去的路由页面信息
// from:来着哪里的路由信息
// next:放行方法
router.beforeEach((to, from, next) => {
  // 所有的页面都会经过导航守卫
//   console.log('被拦截了页面')

  // 只有调用next方法才允许通过
  // next()

  const user = JSON.parse(window.localStorage.getItem('user'))
  // 如果要访问的页面不是/login,校验登陆状态
  // 如果没有登陆,则跳转到登陆页面
  // 如果登陆了,则允许通过

  // 校验非登陆页面的登陆状态
  if (to.path !== '/login') {
    if (user) {
      // 本地有user信息 跳转到下一个链接
      next()
    } else {
      // 本地没有user信息 跳转到登陆页面
      next('/login')
    }
  } else {
    // 登陆页面,正常允许通过
    next()
  }
})

export default router
