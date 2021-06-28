// 基于 axios 封装的请求模块
import axios from 'axios'
import JSONbig from 'json-bigint'
import router from '@/router'

import { Message } from 'element-ui' // 单独引用element的消息组件

// 创建一个axios实例  我们通过这个实例去罚请求,把需要的配置配置发给这个实例来处理
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net', // 请求的基本路径

  // axios 的json字符串转换js对象 方法 我们要重新配置一下  data是后端返回的原始数据  axios默认使用json.parse转换 我们要配置为json-bigint.parse转换
  transformResponse: [function (data) {
    // Do whatever you want to transform the data
    // return data // 相对应 return JSON.parse(data)

    try {
      // 这里要异常处理一下 因为后端返回的数据可能不一个JSON字符串
      return JSONbig.parse(data)
    } catch (err) {
      return data
    }
  }]
})

// 导出请求方法
export default request

// 使用时加载 request 模块

// 请求拦截器
request.interceptors.request.use(
  // 所有请求会经过这里
  // config 是当前请求相关配置信息对象

  function (config) {
    // console.log('请求成功,被拦截了')
    // console.log(config)

    const user = JSON.parse(window.localStorage.getItem('user'))

    // 如果有登陆以后信息,则统一设置token
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }

    // config 是可以修改  当return后请求才会真正的发送出去,如果删除了return则无法完成接口请求
    return config
  },
  // 请求失败会经过这里
  function (error) {
    return Promise.reject(error)
  }
)

// 响应拦截器
// Add a response interceptor
request.interceptors.response.use(function (response) {
  // 响应成功进入这里 所有响应码为 2xx的都触发这个
  return response // response是响应数据  一定要return否则后面请求无法拿到数据
}, function (error) {
  // 任何超出 2xx 的响应码都会进入到这来
  if (error.response && error.response.status === 401) { // 请求失败为401 则判断用户未登陆 跳转到登陆页面
    router.push('/login')
    window.localStorage.removeItem('user') // 清除user本地存储
    Message.error('登陆状态无效,请重新登陆')
  } else if (error.response.status === 403) {
    // 没有操作权限  token 未携带或已过期
    Message.error('没有操作权限')
  } else if (error.response.status === 400) {
    // 客户端参数错误
    Message.error('客户端参数错误')
  } else if (error.response.status >= 500) {
    // 服务端错误
    Message.error('服务端错误')
  }

  return Promise.reject(error)
})
