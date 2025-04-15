import request from '@/utils/request'

export function submit(data) {
    return request({
        url: '/stg/complaintEvaluation/submit',
        method: 'post',
        data
    })
}