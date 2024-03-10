import request from '@/utils/request'

// 查询EmMajorInfo列表
export function listEmMajorInfo(query) {
    return request({
        url: '/api/v1/em-major-info',
        method: 'get',
        params: query
    })
}

// 查询EmMajorInfo详细
export function getEmMajorInfo (id) {
    return request({
        url: '/api/v1/em-major-info/' + id,
        method: 'get'
    })
}


// 新增EmMajorInfo
export function addEmMajorInfo(data) {
    return request({
        url: '/api/v1/em-major-info',
        method: 'post',
        data: data
    })
}

// 修改EmMajorInfo
export function updateEmMajorInfo(data) {
    return request({
        url: '/api/v1/em-major-info/'+data.id,
        method: 'put',
        data: data
    })
}

// 删除EmMajorInfo
export function delEmMajorInfo(data) {
    return request({
        url: '/api/v1/em-major-info',
        method: 'delete',
        data: data
    })
}

