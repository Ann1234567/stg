/*
 * @Description: 
 * @Author: tengkai
 * @Date: 2025-04-07 16:44:49
 * @LastEditors: tengkai
 * @LastEditTime: 2025-04-08 16:31:32
 */
import request from '@/utils/request'

// 摊位浏览列表页面
export function getStallList(query) {
    return request({
        url: '/stg/area/listPage',
        method: 'get',
        params: query
    })
}

// 摊位详情
export function getStallEdit(query) {
    return request({
        url: '/stg/stall/listPage',
        method: 'get',
        params: query
    })
}

//预约
export function subscribe(data) {
    return request({
        url: '/stg/stallReservation/subscribe',
        method: 'post',
        data
    })
}