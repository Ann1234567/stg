/*
 * @Description: 
 * @Author: tengkai
 * @Date: 2025-04-09 11:04:30
 * @LastEditors: tengkai
 * @LastEditTime: 2025-04-09 16:41:19
 */
import request from '@/utils/request'

// 咨询建议提交
export function submit(data) {
    return request({
        url: '/stg/consultProposal/submit',
        method: 'post',
        data
    })
}
