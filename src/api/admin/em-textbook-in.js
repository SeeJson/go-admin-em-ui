import request from '@/utils/request'

// 查询EmTextbookIn列表
export function listEmTextbookIn(query) {
    return request({
        url: '/api/v1/em-textbook-in',
        method: 'get',
        params: query
    })
}

// 查询EmTextbookIn详细
export function getEmTextbookIn (id) {
    return request({
        url: '/api/v1/em-textbook-in/' + id,
        method: 'get'
    })
}


// 新增EmTextbookIn
export function addEmTextbookIn(data) {
    return request({
        url: '/api/v1/em-textbook-in',
        method: 'post',
        data: data
    })
}

// 修改EmTextbookIn
export function updateEmTextbookIn(data) {
    return request({
        url: '/api/v1/em-textbook-in/'+data.id,
        method: 'put',
        data: data
    })
}

// 删除EmTextbookIn
export function delEmTextbookIn(data) {
    return request({
        url: '/api/v1/em-textbook-in',
        method: 'delete',
        data: data
    })
}

