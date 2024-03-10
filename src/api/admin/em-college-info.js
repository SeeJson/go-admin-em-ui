import request from '@/utils/request'

// 查询EmCollegeInfo列表
export function listEmCollegeInfo(query) {
    return request({
        url: '/api/v1/em-college-info',
        method: 'get',
        params: query
    })
}

// 查询EmCollegeInfo详细
export function getEmCollegeInfo (id) {
    return request({
        url: '/api/v1/em-college-info/' + id,
        method: 'get'
    })
}


// 新增EmCollegeInfo
export function addEmCollegeInfo(data) {
    return request({
        url: '/api/v1/em-college-info',
        method: 'post',
        data: data
    })
}

// 修改EmCollegeInfo
export function updateEmCollegeInfo(data) {
    return request({
        url: '/api/v1/em-college-info/'+data.id,
        method: 'put',
        data: data
    })
}

// 删除EmCollegeInfo
export function delEmCollegeInfo(data) {
    return request({
        url: '/api/v1/em-college-info',
        method: 'delete',
        data: data
    })
}

