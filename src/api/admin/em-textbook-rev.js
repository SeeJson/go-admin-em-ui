import request from '@/utils/request'

// 查询EmTextbookRev列表
export function listEmTextbookRev(query) {
    return request({
        url: '/api/v1/em-textbook-rev',
        method: 'get',
        params: query
    })
}

// 查询EmTextbookRev详细
export function getEmTextbookRev (id) {
    return request({
        url: '/api/v1/em-textbook-rev/' + id,
        method: 'get'
    })
}


// 新增EmTextbookRev
export function addEmTextbookRev(data) {
    return request({
        url: '/api/v1/em-textbook-rev',
        method: 'post',
        data: data
    })
}

// 修改EmTextbookRev
export function updateEmTextbookRev(data) {
    return request({
        url: '/api/v1/em-textbook-rev/'+data.id,
        method: 'put',
        data: data
    })
}

// 删除EmTextbookRev
export function delEmTextbookRev(data) {
    return request({
        url: '/api/v1/em-textbook-rev',
        method: 'delete',
        data: data
    })
}

