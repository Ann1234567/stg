import request from '@/utils/request'

// 根据userID获取摊位编号和摊主姓名
export function getTwInfo(userId) {
    return request({
        url: `/stg/user/getInfo/${userId}`,
        method: 'get',
    })
}

// 保存监管信息
export function saveRegulatoryInfo(data) {
    return request({
        url: '/stg/supervise/submit',
        method: 'post',
        data
    })  
}

// 登录
export function login(data) {
    return request({
        url: '/stg/auth/login',
        method: 'post',
        data
    })
}
