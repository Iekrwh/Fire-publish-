import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import { ElementTiptapPlugin } from 'element-tiptap'
// import 'element-tiptap/lib/index.css'

Vue.use(ElementUI)

// Vue.use(ElementTiptapPlugin, {
//   lang: 'zh'
// })
// // 现在你已经在全局注册了 `el-tiptap` 组件。

Vue.config.productionTip = false

// 创建 vue 根实例  把router 配置到实例中  通过render 方法 把app渲染到 #app入口节点

new Vue({
  router,
  render: h => h(App)
  // el:'app' 等于 $mount('#app')
}).$mount('#app')
