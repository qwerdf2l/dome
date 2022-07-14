import req from '@/utils/request'
import url from '@/api/url'

export function getDept(params) {
    return req({
        url: url.dept.dept,
        method: 'get',
        params: params
    })
}

export function addDept(data) {
    return req({
        url: url.dept.dept,
        method: 'post',
        data
    })
}

export function updateDept(data){
    return req({
        url: url.dept.dept,
        method: 'put',
        data
    })
}

export function delDept(id){
    return req({
        url: url.dept.dept + '/' + id,
        method: 'delete'
    })
}