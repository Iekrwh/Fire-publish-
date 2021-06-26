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
