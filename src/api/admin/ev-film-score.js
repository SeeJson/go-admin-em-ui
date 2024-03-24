import request from '@/utils/request'

// 查询EvFilmScore列表
export function listEvFilmScore(query) {
    return request({
        url: '/api/v1/ev-film-score',
        method: 'get',
        params: query
    })
}

// 查询EvFilmScore详细
export function getEvFilmScore (id) {
    return request({
        url: '/api/v1/ev-film-score/' + id,
        method: 'get'
    })
}


// 新增EvFilmScore
export function addEvFilmScore(data) {
    return request({
        url: '/api/v1/ev-film-score',
        method: 'post',
        data: data
    })
}

// 修改EvFilmScore
export function updateEvFilmScore(data) {
    return request({
        url: '/api/v1/ev-film-score/'+data.id,
        method: 'put',
        data: data
    })
}

// 删除EvFilmScore
export function delEvFilmScore(data) {
    return request({
        url: '/api/v1/ev-film-score',
        method: 'delete',
        data: data
    })
}

