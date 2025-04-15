import request from '@/utils/request'

// 获取热点信息
export function getNews(query) {
  return request({
    url: '/stg/news/listPage',
    method: 'get',
    params:query
  })
}

// 获取热点信息详情
export function getNewsEdit(newsId) {
    return request({
      url: '/stg/news/getInfo/'+newsId,
      method: 'get',
    })
  }