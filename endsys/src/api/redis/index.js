import url from '../url'
import req from '@/utils/request'

export function getRedis(params){
    return req({
        method: 'GET',
        url:url.redis.redis,
        params
    })
}
export function delRedis(data){
    return req({
        method: 'DELETE',
        url:url.redis.delRedis,
        data
    })
}
export function delAllRedis(){
    return req({
        method: 'DELETE',
        url:url.redis.delAllRedis,
    })
}