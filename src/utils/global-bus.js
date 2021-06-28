// 全局通信总线
// 可以让任何组件之间相互通信

import Vue from 'vue'

export default new Vue()

// a 组件 要给 b 组件 发送数据

// b 注册通信事件
// import globalBus  from './global-bus'
// globalBus.$on('自定义名称', (参数名,没有可以不写) => {
// 内容
// })

// a 发布通信事件
// import globalBus from './global-bus'
// globalBus.$emit('自定义名称',传送的数据)

// 两端的事件名称必须一致
