import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

创建 vue 根实例  把router 配置到s

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
