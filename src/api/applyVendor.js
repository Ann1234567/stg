/*
 * @Description: 
 * @Author: tengkai
 * @Date: 2025-04-07 11:18:33
 * @LastEditors: tengkai
 * @LastEditTime: 2025-04-09 10:24:42
 */
import request from '@/utils/request'

// 上传文件
export function uploadFile(data) {
    return request({
        url: '/stg/file/upload',
        method: 'post',
        data
    })
}
// 上传多个文件
export function uploadFiles(data) {
    return request({
        url: '/stg/file/uploads',
        method: 'post',
        data
    })
}
//获取用户注册信息
export function getUserInfo() {
    return request({
        url: '/stg/user/getUserInfo',
        method: 'get',
    })
}