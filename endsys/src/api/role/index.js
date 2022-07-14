import url from '@/api/url'
import req from '@/utils/request'

export function getRoles() {
    return req({
        url: url.role.all,
        method: 'get'
    })
}

// 获取用户等级
export function getLevel() {
    return req({
        method: 'get',
        url: url.role.role,
    }) 
}
// 获取角色管理界面角色列表
export function getRole(params) {
    return req({
        method: 'get',
        url: url.role.roles,
        params
    }) 
}
// 获取菜单分配树形控件数据
export function getTree() {
    return req({
        method: 'get',
        url: url.role.tree,
    }) 
}
//新增用户
export function addRoles(data){
    return req({
        method: 'post',
        url: url.role.roles,
        data
    }) 
}
// 编辑用户
export function editRoles(data){
    return req({
        method: 'put',
        url: url.role.roles,
        data
    }) 
}
// 删除用户
export function deleteRoles(id){
    return req({
        method: 'delete',
        url: url.role.roles+'/'+id,
    }) 
}

export function getRolesmenu(id){
    return req({
        method: 'get',
        url: url.role.roles+'/'+id,
    }) 
}