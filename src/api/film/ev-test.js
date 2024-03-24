import request from '@/utils/request'

// 查询EvFilmAnalysis列表
export function listEvFilmAnalysis(query) {
    return request({
        url: '/api/v1/ev-film-analysis',
        method: 'get',
        params: query
    })
}

// 查询EvFilmAnalysis详细
export function getEvFilmAnalysis (id) {
    return request({
        url: '/api/v1/ev-film-analysis/' + id,
        method: 'get'
    })
}


// 新增EvFilmAnalysis
export function addEvFilmAnalysis(data) {
    return request({
        url: '/api/v1/ev-film-analysis',
        method: 'post',
        data: data
    })
}

// 修改EvFilmAnalysis
export function updateEvFilmAnalysis(data) {
    return request({
        url: '/api/v1/ev-film-analysis/'+data.id,
        method: 'put',
        data: data
    })
}

// 删除EvFilmAnalysis
export function delEvFilmAnalysis(data) {
    return request({
        url: '/api/v1/ev-film-analysis',
        method: 'delete',
        data: data
    })
}

