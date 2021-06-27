// 素材请求

import request from '@/utils/request'

// 上传图片素材

export const uploadImage = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/user/images',
    // 一般上传文件都要求把请求头中的 Content-Type 设置为 multipart/form-data,但是我们使用axios上传文件的话不需要手动设置
    // 只需要给data一个 FormData 对象即可
    data

  })
}

// 获取素材列表

export const getImages = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/images',
    params
  })
}

// 收藏素材列表

export const collectImages = (imageID, collect) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/user/images/${imageID}`,
    data: {
      collect
    }
  })
}

// 删除素材

export const deleteImages = imageID => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/user/images/${imageID}`

  })
}
