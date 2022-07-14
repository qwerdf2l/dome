import req from '@/utils/request'
import url from '@/api/url'

// 查询
export function getUser(params) {
    return req({
        url: url.user.user,
        method: 'get',
        params
    })
}

// 添加/新增
export function addUser(data) {
    return req({
        url: url.user.user,
        method: 'post',
        data
    })
}

// 修改
export function editUser(data) {
    return req({
        url: url.user.user,
        method: 'put',
        data
    })
}

export function delUser(id){
    return req({
        url: url.user.user +'/' + id,
        method: 'DELETE'
    })
}