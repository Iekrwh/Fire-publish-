import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// 创建 vue 根实例  把router 配置到实例中  通过render 方法 把app渲染到 #app入口节点

new Vue({
  router,
  render: h => h(App)
  // el:'app' 
}).$mount('#app')
