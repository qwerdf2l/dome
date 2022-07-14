import req from '@/utils/request'
import url from '@/api/url'

// 获取字典列表的数据
export function getDict(params){
    return req({
        url: url.dict.dict,
        method: 'get',
        params
    })
}

// 获取当前字典的详情列表
export function getDictDetail(params){
    return req({
        url: url.dict.dictDetail,
        method: 'get',
        params
    })
}

// 提交新增字典列表数据
export function addDict(data){
    return req({
        url: url.dict.dict,
        method: 'post',
        data
    })
}

// 提交修改字典列表数据
export function editDict(data){
    return req({
        url: url.dict.dict,
        method: 'put',
        data
    })
}

// 删除字典
export function deleteDict(id){
    return req({
        url: url.dict.dict + '/' + id,
        method: 'delete'
    })
}

// 新增字典详情
export function addDictDetail(data){
    return req({
        url:url.dict.dictDetail,
        method: 'post',
        data
    })
}