import request from '@/utils/request'

// 摊位浏览列表页面
export function listByMonth(query) {
    return request({
        url: '/stg/stallSignIn/listByMonth',
        method: 'get',
        params: query
    })
}

// 出摊签到
export function openStallSignIn(data) {
    return request({
        url: '/stg/stallSignIn/openStallSignIn',
        method: 'post',
        data
    })
}

// 收摊签退
export function closeStallSignIn(data) {
    return request({
        url: '/stg/stallSignIn/closeStallSignIn',
        method: 'post',
        data
    })
}

// 获取当日签到信息
export function getSignInInfo(query) {
    return request({
        url: '/stg/stallSignIn/getSignInInfo',
        method: 'get',
        params: query
    })
}