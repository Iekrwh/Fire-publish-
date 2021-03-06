// 文章请求

import request from '@/utils/request'

// 获取文章列表
//                     此处的params为传参
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    // Body 参数使用data 设置
    // Query 参数使用 params 设置
    // Headers 参数使用 headers 设置
    // params: params    //当配置名和参数一致时可以简写
    params

  })
}

// 获取文章频道
export const getArticlesChannels = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/channels'

  })
}

// 删除文章
export const DeleteArticle = articleID => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/articles/${articleID}`

  })
}

// 发布文章
export const addArticle = (data, draft = false) => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/articles',
    params: {
      draft
    },
    data

  })
}

// 编辑文章
export const updateArticle = (articledID, data, draft = false) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/articles/${articledID}`,
    params: {
      draft
    },
    data

  })
}

// 获取文章
export const getArticle = (articledID) => {
  return request({
    method: 'GET',
    url: `/mp/v1_0/articles/${articledID}`
  })
}

// 修改文章评论状态
export const updateCommentStatus = (articledID, allowComment) => {
  return request({
    method: 'PUT',
    url: '/mp/v1_0/comments/status',
    params: {
      article_id: articledID
    },
    data: {
      allow_comment: allowComment
    }
  })
}
