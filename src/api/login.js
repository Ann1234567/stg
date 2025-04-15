import request from '@/utils/request'

// 注册
export function register(data) {
    return request({
        url: '/stg/user/register',
        method: 'post',
        data
    })
}
// 修改信息
export function update(data) {
    return request({
        url: '/stg/user/update',
        method: 'post',
        data
    })
}
// 登录
export function login(data) {
    return request({
        url: '/stg/auth/mobile/login',
        method: 'post',
        data
    })
}