/*
 * @Description: 
 * @Author: tengkai
 * @Date: 2025-04-09 13:36:20
 * @LastEditors: tengkai
 * @LastEditTime: 2025-04-09 13:36:53
 */
import request from '@/utils/request'

export function getHistoryList(query) {
    return request({
        url: '/stg/complaintEvaluation/listPage',
        method: 'get',
        params: query
    })
}