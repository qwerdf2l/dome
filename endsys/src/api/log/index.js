import url from "@/api/url"
import req from "@/utils/request"

export function getLogError(params){
    return req({
        url:url.logs.error,
        method:'GET',
        params:params
    })
}

export function outError(data){
    return req({
        url:url.logs.error+`/${data}`,
        method:'GET',
    })
}