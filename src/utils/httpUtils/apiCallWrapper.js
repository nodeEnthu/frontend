import axios from 'axios';

export function securedPostCall(endPoint, bodyParams) {
    let token = sessionStorage.getItem('token');
    return axios({
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        url: endPoint,
        data: bodyParams
    });
}

export function securedGetCall(endPoint, params) {
    let token = sessionStorage.getItem('token');
    return axios({
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        url: endPoint,
        params: params
    })
}

export function getCall(endPoint,params) {
    return axios({
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        },
        url: endPoint,
        params: params
    })
}

