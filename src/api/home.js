import request from '@/utils/request'

// 获取公告咨询
export function getListSlideshow(query) {
  return request({
    url: '/stg/news/listSlideshow',
    method: 'get',
    params: query
  })
}
//字典表
export function getDictType(dictType) {
  return request({
    url: `/stg/dictData/listDict/${dictType}`,
    method: 'get',
  })
}

//搜索店铺
export function getList(query) {
  return request({
    url: `/stg/user/listPageByStallName`,
    method: 'get',
    params: query
  })
}