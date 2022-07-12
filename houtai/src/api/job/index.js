import url from '@/api/url'
import req from '@/utils/request'

export function getJob(params) {
      return req({
         method: 'get',
         url: url.job.job,
         params
      })
}