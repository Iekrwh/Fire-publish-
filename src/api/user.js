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
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/profile',
    // 后端api要求把需要授权的用户身份放到请求头中
    // axios 可以通过headers 设置请求头
    headers: {
      // 属性名和值都得看接口的要求
      // 属性名为 Authorization
      // 值为 Bearer +token值
      Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTYwNTYwNjgsInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.4MnojiXiUID8T6oL2eKSMYMO2xWOm0mZ6WLMaBpUXTE'
    }
  })
}
