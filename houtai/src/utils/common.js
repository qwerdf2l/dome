import { mygetUserData } from "@/api/user";
import store from "@/store";
// 时间格式化
export function publicTime(data) {
   if (/^\d+$/.test(data)) {
      var time = new Date(data)
      return time.toLocaleString().replace(/\//g, '-')
   }
   return data.toLocaleString().replace(/\//g, '-')

}
// 获取用户信息
export function getUser(data) {
   return mygetUserData(data).then(res => {
      return store.commit("user/setUserData", res);
   })
}