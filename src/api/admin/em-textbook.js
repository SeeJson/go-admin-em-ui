import request from '@/utils/request'

// 查询EmTextbook列表
export function listEmTextbook(query) {
    return request({
        url: '/api/v1/em-textbook',
        method: 'get',
        params: query
    })
}

// 查询EmTextbook详细
export function getEmTextbook (id) {
    return request({
        url: '/api/v1/em-textbook/' + id,
        method: 'get'
    })
}


// 新增EmTextbook
export function addEmTextbook(data) {
    return request({
        url: '/api/v1/em-textbook',
        method: 'post',
        data: data
    })
}

// 修改EmTextbook
export function updateEmTextbook(data) {
    return request({
        url: '/api/v1/em-textbook/'+data.id,
        method: 'put',
        data: data
    })
}

// 删除EmTextbook
export function delEmTextbook(data) {
    return request({
        url: '/api/v1/em-textbook',
        method: 'delete',
        data: data
    })
}

