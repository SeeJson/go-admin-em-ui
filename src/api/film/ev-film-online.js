import request from '@/utils/request'

// 查询EvFilmOnline列表
export function listEvFilmOnline(query) {
    return request({
        url: '/api/v1/ev-film-online',
        method: 'get',
        params: query
    })
}

// 查询EvFilmOnline详细
export function getEvFilmOnline (id) {
    return request({
        url: '/api/v1/ev-film-online/' + id,
        method: 'get'
    })
}


// 新增EvFilmOnline
export function addEvFilmOnline(data) {
    return request({
        url: '/api/v1/ev-film-online',
        method: 'post',
        data: data
    })
}

// 修改EvFilmOnline
export function updateEvFilmOnline(data) {
    return request({
        url: '/api/v1/ev-film-online/'+data.id,
        method: 'put',
        data: data
    })
}

// 删除EvFilmOnline
export function delEvFilmOnline(data) {
    return request({
        url: '/api/v1/ev-film-online',
        method: 'delete',
        data: data
    })
}

