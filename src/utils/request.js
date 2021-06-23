// 基于 axios 封装的请求模块
import axios from 'axios'

// 创建一个axios实例  我们通过这个实例去罚请求,把需要的配置配置发给这个实例来处理
const request = axios.create({
  baseURL: '' // 请求的基本路径
})

// 导出请求方法
export default request

// 使用时加载 request 模块
