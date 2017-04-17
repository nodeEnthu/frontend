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

export function postCall(endPoint, bodyParams) {
    return axios({
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        url: endPoint,
        data: bodyParams
    })
}
export function putImgCall(endPoint, data) {
    return axios.put(endPoint, data, {
        headers: {
            'Content-Type': 'image/png'
        }
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
// check securedGetCall adds in header depending up whether user is logged in or not
export function checkSecuredGetCall(endPoint, params) {
    let token = sessionStorage.getItem('token');
    let headers = (token) ? {
        'Content-Type': 'application/json',
        'Authorization': (token) ? 'Bearer ' + token : undefined
    } : {
        'Content-Type': 'application/json'
    };
    return axios({
        method: 'get',
        headers: headers,
        url: endPoint,
        params: params
    })
}

export function getCall(endPoint, params) {
    return axios({
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        },
        url: endPoint,
        params: params
    })
}
