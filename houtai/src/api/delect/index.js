import url from '@/api/url'
import req from '@/utils/request'
export function myDelete(id) {
   return req({
      method: 'delete',
      url: url.delete.delete + id,
   })
}