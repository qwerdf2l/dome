import url from '@/api/url'
import req from '@/utils/request'
// 状态
export function mygetUserStatus(params) {
   return req({
      method: 'get',
      url: url.user.userStatus,
      params
   })
}
// 部门
export function mygetMenu(params) {
   return req({
      method: 'get',
      url: url.dept.dept,
      params
   })
}
// 用户
export function mygetUserData(params) {
   return req({
      method: 'get',
      url: url.user.userData,
      params
   })
}
// post新增用户
export function mypostUserData(data) {
   return req({
      method: 'post',
      url: url.user.userData,
      data
   })
}
// put修改用户
export function myputUserData(data) {
   return req({
      method: 'put',
      url: url.user.userData,
      data
   })
}
