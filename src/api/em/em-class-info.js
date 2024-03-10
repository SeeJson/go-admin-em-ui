import request from '@/utils/request'

// 查询EmClassInfo列表
export function listEmClassInfo(query) {
    return request({
        url: '/api/v1/em-class-info',
        method: 'get',
        params: query
    })
}

// 查询EmClassInfo详细
export function getEmClassInfo (id) {
    return request({
        url: '/api/v1/em-class-info/' + id,
        method: 'get'
    })
}


// 新增EmClassInfo
export function addEmClassInfo(data) {
    return request({
        url: '/api/v1/em-class-info',
        method: 'post',
        data: data
    })
}

// 修改EmClassInfo
export function updateEmClassInfo(data) {
    return request({
        url: '/api/v1/em-class-info/'+data.id,
        method: 'put',
        data: data
    })
}

// 删除EmClassInfo
export function delEmClassInfo(data) {
    return request({
        url: '/api/v1/em-class-info',
        method: 'delete',
        data: data
    })
}

