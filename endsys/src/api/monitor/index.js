import req from '@/utils/request'
import url from '@/api/url'

// 查询日志
export function getLog(params) {
    return req({
        url: url.logs.logs,
        method: 'get',
        params
    })
}