import url from '@/api/url'
import req from '@/utils/request'
 

export function getCode() {
    return req({
        method: 'get',
        url: url.login.code
    }) 
}


export function myLogin(data) {
    return req({
        method: 'post',
        url: url.login.login,
        data
    })
}


// 查询菜单
export function getMenus() {
    return req({
        method: 'get',
        url: url.login.build
    })
}