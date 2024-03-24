import request from '@/utils/request'

// 查询EvFilmInfo列表
export function listEvFilmInfo(query) {
    return request({
        url: '/api/v1/ev-film-info',
        method: 'get',
        params: query
    })
}

// 查询EvFilmInfo详细
export function getEvFilmInfo (id) {
    return request({
        url: '/api/v1/ev-film-info/' + id,
        method: 'get'
    })
}


// 新增EvFilmInfo
export function addEvFilmInfo(data) {
    return request({
        url: '/api/v1/ev-film-info',
        method: 'post',
        data: data
    })
}

// 修改EvFilmInfo
export function updateEvFilmInfo(data) {
    return request({
        url: '/api/v1/ev-film-info/'+data.id,
        method: 'put',
        data: data
    })
}

// 删除EvFilmInfo
export function delEvFilmInfo(data) {
    return request({
        url: '/api/v1/ev-film-info',
        method: 'delete',
        data: data
    })
}

