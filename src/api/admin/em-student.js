import request from '@/utils/request'

// 查询EmStudent列表
export function listEmStudent(query) {
    return request({
        url: '/api/v1/em-student',
        method: 'get',
        params: query
    })
}

// 查询EmStudent详细
export function getEmStudent (id) {
    return request({
        url: '/api/v1/em-student/' + id,
        method: 'get'
    })
}


// 新增EmStudent
export function addEmStudent(data) {
    return request({
        url: '/api/v1/em-student',
        method: 'post',
        data: data
    })
}

// 修改EmStudent
export function updateEmStudent(data) {
    return request({
        url: '/api/v1/em-student/'+data.id,
        method: 'put',
        data: data
    })
}

// 删除EmStudent
export function delEmStudent(data) {
    return request({
        url: '/api/v1/em-student',
        method: 'delete',
        data: data
    })
}

