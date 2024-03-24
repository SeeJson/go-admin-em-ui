import request from '@/utils/request'

// 查询EvAreaFilmInfo列表
export function listEvAreaFilmInfo(query) {
    return request({
        url: '/api/v1/ev-area-film-info',
        method: 'get',
        params: query
    })
}

// 查询EvAreaFilmInfo详细
export function getEvAreaFilmInfo (id) {
    return request({
        url: '/api/v1/ev-area-film-info/' + id,
        method: 'get'
    })
}


// 新增EvAreaFilmInfo
export function addEvAreaFilmInfo(data) {
    return request({
        url: '/api/v1/ev-area-film-info',
        method: 'post',
        data: data
    })
}

// 修改EvAreaFilmInfo
export function updateEvAreaFilmInfo(data) {
    return request({
        url: '/api/v1/ev-area-film-info/'+data.id,
        method: 'put',
        data: data
    })
}

// 删除EvAreaFilmInfo
export function delEvAreaFilmInfo(data) {
    return request({
        url: '/api/v1/ev-area-film-info',
        method: 'delete',
        data: data
    })
}

