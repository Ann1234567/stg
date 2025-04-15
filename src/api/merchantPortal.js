import request from '@/utils/request'

// 注册
export function getListPage(query) {
    return request({
        url: '/stg/message/listPage',
        method: 'get',
        params: query
    })
}