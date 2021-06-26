// 基于 axios 封装的请求模块
import axios from 'axios'
import JSONbig from 'json-bigint'

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
