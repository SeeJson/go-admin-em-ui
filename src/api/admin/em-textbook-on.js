import request from '@/utils/request'

// 查询EmTextbookOn列表
export function listEmTextbookOn(query) {
    return request({
        url: '/api/v1/em-textbook-on',
        method: 'get',
        params: query
    })
}

// 查询EmTextbookOn详细
export function getEmTextbookOn (id) {
    return request({
        url: '/api/v1/em-textbook-on/' + id,
        method: 'get'
    })
}


// 新增EmTextbookOn
export function addEmTextbookOn(data) {
    return request({
        url: '/api/v1/em-textbook-on',
        method: 'post',
        data: data
    })
}

// 修改EmTextbookOn
export function updateEmTextbookOn(data) {
    return request({
        url: '/api/v1/em-textbook-on/'+data.id,
        method: 'put',
        data: data
    })
}

// 删除EmTextbookOn
export function delEmTextbookOn(data) {
    return request({
        url: '/api/v1/em-textbook-on',
        method: 'delete',
        data: data
    })
}

