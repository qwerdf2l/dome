import url from '@/api/url'
import request from '@/utils/request'
//菜单管理
export function assignMenu(params){
    return request({
        method: 'get',
        url: url.menus.menus,
        params
    }) 
}

//角色管理菜单分配确认按钮
export function ConfirmMenu(data){
    return request({
        method: 'put',
        url: url.menu.menu,
        data
    }) 
}