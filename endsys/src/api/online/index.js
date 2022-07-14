import url from '@/api/url'
import req from '@/utils/request'


export function getOnline(params){
    return req ({
        url:url.online.online,
        method:'get',
       params
    })
}

export function delOnline(key){
    return req({
        method:'DELETE',
        url:url.online.online+'/'+key,
    })
}

export function felOnline(params){
    return req({
        url:url.online.online,
        method:'get',
        params
    })
}