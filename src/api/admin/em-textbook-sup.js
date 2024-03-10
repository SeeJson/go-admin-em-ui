import request from '@/utils/request'

// 查询EmTextbookSup列表
export function listEmTextbookSup(query) {
    return request({
        url: '/api/v1/em-textbook-sup',
        method: 'get',
        params: query
    })
}

// 查询EmTextbookSup详细
export function getEmTextbookSup (id) {
    return request({
        url: '/api/v1/em-textbook-sup/' + id,
        method: 'get'
    })
}


// 新增EmTextbookSup
export function addEmTextbookSup(data) {
    return request({
        url: '/api/v1/em-textbook-sup',
        method: 'post',
        data: data
    })
}

// 修改EmTextbookSup
export function updateEmTextbookSup(data) {
    return request({
        url: '/api/v1/em-textbook-sup/'+data.id,
        method: 'put',
        data: data
    })
}

// 删除EmTextbookSup
export function delEmTextbookSup(data) {
    return request({
        url: '/api/v1/em-textbook-sup',
        method: 'delete',
        data: data
    })
}

