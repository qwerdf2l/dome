import url from '@/api/url'
import req from '@/utils/request'


export function getJob(params) {
    return req({
        url: url.job.job,
        method: 'get',
        params
    })
}


export function addJob(data) {
    return req({
        url: url.job.job,
        method: 'post',
        data
    })
}