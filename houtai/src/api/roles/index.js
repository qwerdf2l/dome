import url from '@/api/url'
import req from '@/utils/request'

// 用户管理新增和修改所需
export function getRoles() {
   return req({
      method: "get",
      url: url.roles.roles,

   })
}
// 角色管理所需
export function getRole(params) {
   return req({
      method: "get",
      url: url.role.role,
      params
   })
}
// 角色新增
export function postRole(data) {
   return req({
      method: "post",
      url: url.role.role,
      data
   })
}

// 角色修改
export function putRole(data) {
   return req({
      method: "put",
      url: url.role.role,
      data
   })
}