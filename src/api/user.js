import request from '@/utils/request'

// 用户登录
export const login = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    data
  })
}

// 获取用户信息
export const getUserProfile = () => {
  // 因为本地存储的是json字符串所以要把json字符串重新转为原来的类型
//   const user = JSON.parse(window.localStorage.getItem('user'))
  //   console.log(user)
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/profile'
    // 后端api要求把需要授权的用户身份放到请求头中
    // axios 可以通过headers 设置请求头
    // headers: {
    // 属性名和值都得看接口的要求
    // 属性名为 Authorization
    // 值为 Bearer +token值
    // 不要用加号拼接 用反引号 `${}`拼接
    //   Authorization: `Bearer ${user.token}`
    // }
  })
}
